<template>
  <div class="hello">
    <!-- {{msg}} -->
    <button @click="sendMsg">发送msg</button>
  </div>
</template>

<script>

export default {
  data () {
    return {
      msg: 'hello welcome to webscoket!',
      msg_data: [],
      websock: null
    }
  },

  created () {
    this.initWebSocket()
  },

  destroyed () {
    this.websocketclose()
  },

  methods: {
    initWebSocket () {
      this.websock = new WebSocket('ws://127.0.0.1:8080/websocket/tracker')
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onmessage = this.websocketonmessage
      this.websock.onclose = this.websocketclose
    },

    websocketonopen () {
      console.log('WebSocket连接成功')
    },

    websocketonerror (e) {
      console.log('WebSocket连接发生错误')
    },

    websocketonmessage (e) {
      console.log(e.data)
      this.msg_data.unshift(e.data)
    },

    websocketclose (e) {
      console.log('connection closed (' + e.code + ')')
    },

    sendMsg () {
      this.websock.send(this.msg)
    }
  }
}

</script>
