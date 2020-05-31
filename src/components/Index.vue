<template>
  <div >
<!--    //登录获取cookie-->
    <el-form label-width="50" style="width: 500px">
      <el-form-item>
        用户名：
        <el-input v-model="username"></el-input>
      </el-form-item>
      <el-form-item>
        密码：
        <el-input v-model="password"></el-input>
      </el-form-item>
      <el-button @click="login">登录获取cookie</el-button>
    </el-form>

    <el-button @click="test">测试接口</el-button>

<!--    //创建websocket连接-->
    <el-form label-width="50" style="width: 500px">
      <el-form-item>
        连接节点地址：
        <el-input v-model="endpointUrl"></el-input>
      </el-form-item>
      <el-form-item>
        订阅地址：
        <el-input v-model="subscriptionUrl"></el-input>
      </el-form-item>
      <el-form-item>
        发送消息地址：
        <el-input v-model="sendUrl"></el-input>
      </el-form-item>
      <el-button @click="createConnect">创建连接</el-button>
    </el-form>
    <el-card>
      {{receive}}
    </el-card>
    <el-form label-width="50" style="width: 500px">
      <el-form-item>
        发送消息：
        <el-input v-model="msg"></el-input>
      </el-form-item>
      <el-button @click="sendMsg">发送消息</el-button>
    </el-form>
  </div>
</template>

<script>
import SockJS from 'sockjs-client';
import Stomp from '@stomp/stompjs';
import { login, test } from '../api/auth'
export default {
  data () {
    return {
      username: 'admin',
      password: 'admin',
      // endpointUrl: 'ws://127.0.0.1:8080/websocket/tracker',
      endpointUrl: 'http://127.0.0.1:8080/websocket/tracker',
      subscriptionUrl: '/topic/tracker',
      sendUrl: '/topic/activity',
      msg: '发送的消息',
      receive: '',
      msg_data: [],
      websock: null
    }
  },

  created () {
    // this.initWebSocket()
  },

  destroyed () {
    this.websocketclose()
  },

  methods: {
    test() {
      test(resp => {
        console.log("1111")
        console.log(resp)
      })
    },
    login() {
      if (!this.username) {
        this.$message("用户名不能为空")
      }
      if (!this.password) {
        this.$message("密码不能为空")
      }
      let params = {
        username: this.username,
        password: this.password,
        'remember-me': 1
      }
      login(params, resp => {
        console.log("登录返回结果：" + resp)
        console.log(resp)
        console.log(document.cookie)
        console.log($cookies.get('JSESSIONID') )

      })
    },
    createConnect() {
      this.initWebSocket()
    },
    initWebSocket () {

      var stompClient = null;
      // 下面的url是本地运行的jar包的websocket地址
      var socket = new SockJS(this.endpointUrl);

      stompClient = Stomp.over(socket);
      stompClient.connect({}, function (frame) {
        //setConnected(true);
        console.log('Connected: ' + frame);

        // websocket订阅一个topic，第一个参数是top名称
        // 第二个参数是一个回调函数,表示订阅成功后获得的data
        stompClient.subscribe('/topic/tracker', function (data) {
          // 一般来说这个data是一个 Frame对象,需要JSON.parse(data)一下拿到数据
          var msg=JSON.parse(data.body)
          // 这样才能拿到需要的数据格式,一个对象。  下面是一个例子
          //  {name:"Andy",age:30,"lastLogin":"2018-08-15 12:33:12","ipAddress":"45.123.12.4"}
          //  然后对这个数据进行处理,渲染到页面就可以了。
        })


      }, function (res) {
        console.log("error");
        console.log(res);
      });


      stompClient.ws.onclose = function (res) {
        console.log('Connection closed!');
        console.log(res);
      };


      // this.websock = new WebSocket(this.endpointUrl)
      //
      // console.log("33333333")
      // console.log(this.websock)
      //
      // this.websock.onopen = this.websocketonopen
      // this.websock.onerror = this.websocketonerror
      // this.websock.onmessage = this.websocketonmessage
      // this.websock.onclose = this.websocketclose
    },

    websocketonopen (info) {
      console.log('WebSocket连接成功')
      console.log(info)
    },

    websocketonerror (e) {
      console.log('WebSocket连接发生错误')
      console.log(e)
    },

    websocketonmessage (e) {
      console.log('接受消息')
      console.log(e)
      this.receive = e
      // this.msg_data.unshift(e.data)
    },

    websocketclose (e) {
      console.log('关闭连接')
      console.log(e)
    },

    sendMsg () {
      console.log('发送消息')
      console.log()
      console.log(this.msg)
      this.websock.send(this.msg)
    }
  }
}

</script>
