import React, { Component } from 'react';
import { Select ,TimePicker,Button,Card,InputNumber } from 'antd';

import './App.css';
const Option = Select.Option;


class App extends Component {
  state=
  { value1:0,
    value2:0,
    stu_time:0,
    res_time:0,
    mor_stu_time:0,
    display:'none'
  };

  handle_1_Change(value) {
    console.log(`selected ${value}`);

    switch (value){
    case "100":
        this.setState({
          stu_time:8,
          mor_stu_time:3.3
        })
        //早3.3(41.25%)，中2(25%)，晚2.7(33.75%)，58.75%（中42.55，晚57.45%）
        break;
    case "90":
        this.setState({
          stu_time:7.3,
          mor_stu_time:3.3
        });//早3.3
        break;
    case "80":
        this.setState({
          stu_time:6.75,
          mor_stu_time:2.8
        });//早2.8，中1.68，晚2.27
        break;
    case "70":
        this.setState({
          stu_time:6.25,
          mor_stu_time:2.5
        });//早2.5，中1.595，晚2.154
        break;
      }
  }

  handle_2_Change(value) {
    console.log(`selected ${value}`);

    switch (value){
    case "100":
        this.setState({
          res_time:0
        });
        break;
    case "90":
        this.setState({
          res_time:0.4
        });
        break;
    case "80":
        this.setState({
          res_time:0.8
        });
        break;
    case "70":
        this.setState({
          res_time:1.2
        });
        break;
      }
  }


  onChange(time){
      this.setState({
        value1:Number(time.target.value)
      })
    console.log(Number(time.target.value));
  }

  onChange_1(time){

      this.setState({
        value2:Number(time.target.value)
      })


    console.log(time.target.value);
  }

  handleClick(){
    console.log(this.state.mor_stu_time);
    console.log(this.state.stu_time);
    if(this.state.stu_time!=0&&this.state.value1!=0){
      this.setState({
      display:'block'
    })}

  }

  render() {
    const gridStyle = {
      width: '100%',
      textAlign: 'center',
    };
    var formStyle={
      display:this.state.display
    }
    const play1=0.667;
    const play2=1.333;
    const noon_rest=3.83;
    const dinner_time=18.5;
    const nig_stu_start=19.5;
    const noon_to_nig=0.4255;
    const nig_to_noon=0.5745;

    var wake_time=this.state.value1+this.state.value2/60;
    var stu_time=this.state.stu_time-this.state.mor_stu_time;

    var mid_stu_time=0.2778*stu_time;
    var nig_stu_time=0.3472*stu_time;
    var noon_start=wake_time+4+noon_rest;

    function min_changer(num){
      if(isNaN(num)){
        return 0
      }else{
        var minute=num%1;
        return minute*60;
      }
    }
    function hour_changer(num){
      if(isNaN(num)){
        return 0
      }else{
        console.log(num);
        var hour=num-num%1;
        return hour;
      }
    }


    return (
      <div>
        <Select defaultValue="努力程度" style={{ width: 120 }} onChange={this.handle_1_Change.bind(this)}>
          <Option value="100">100</Option>
          <Option value="90">90</Option>
          <Option value="80">80</Option>
          <Option value="70">70</Option>
        </Select>
        <Select defaultValue="起床状态" style={{ width: 120 }} onChange={this.handle_2_Change.bind(this)}>
          <Option value="100">100</Option>
          <Option value="90">90</Option>
          <Option value="80">80</Option>
          <Option value="70">70</Option>
        </Select>

        <span>请输入起床时间</span><input value={this.state.value1} onChange={this.onChange.bind(this) } className="input" required="required"/>点
        <input value={this.state.value2} onChange={this.onChange_1.bind(this) } className="input" required="required"/>分
        <Button onClick={this.handleClick.bind(this)}>查看</Button>
        <div style={formStyle}>
          <Card.Grid style={gridStyle}>早上{hour_changer(wake_time+play1)}点{Math.floor(min_changer(wake_time+play1))}分，开始学习</Card.Grid>
          <Card.Grid style={gridStyle}>{hour_changer(wake_time+4)}点{Math.floor(min_changer(wake_time+4)) }分吃饭</Card.Grid>
          <Card.Grid style={gridStyle}>{hour_changer(wake_time+4+play2) }点{Math.floor(min_changer(wake_time+4+play2)) }分锻炼</Card.Grid>
          <Card.Grid style={gridStyle}>下午{hour_changer(noon_start) }点{Math.floor(min_changer(noon_start)) }分开始学习</Card.Grid>
          <Card.Grid style={gridStyle}>下午需要完成{hour_changer((stu_time*noon_to_nig)) }小时{Math.floor(min_changer(stu_time*noon_to_nig)) }分的学习</Card.Grid>
          <Card.Grid style={gridStyle}>晚上7点半开始学习</Card.Grid>
          <Card.Grid style={gridStyle}>晚上需要完成{hour_changer(stu_time*nig_to_noon) }小时{Math.floor(min_changer(stu_time*nig_to_noon)) }分的学习</Card.Grid>

          <Card.Grid style={gridStyle}>{Math.floor(hour_changer(19.5+this.state.res_time+stu_time*nig_to_noon))}点
            {Math.floor(min_changer(19.5+this.state.res_time+stu_time*nig_to_noon))}分结束学习</Card.Grid>

          <Card.Grid style={gridStyle}>总结:今天的总学习时间是{hour_changer(this.state.stu_time-this.state.res_time)}小时
            {Math.floor(min_changer(this.state.stu_time-this.state.res_time))}分钟，可以游戏时间{hour_changer(this.state.res_time+play1+play2)}小时
            {Math.floor(min_changer(this.state.res_time+play1+play2))}分
          ,下午和晚上各有{Math.floor(min_changer(this.state.res_time)*0.5)}分钟的休息时间</Card.Grid>

        </div>

    </div>
    );
  }
}

export default App;
