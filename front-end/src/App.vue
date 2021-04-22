<template>
<div id="app">
  <div class="header">
    <div class="brand">
      <h1>G-O!</h1>
      <h2>SSBU Tournament Registration System</h2>
    </div>
  </div>
  <div class="content">
    <router-view />

    <footer>
      <div class="container">
        <div class="columns">
          <div class="column">
            <a href="https://github.com/jgallar-byu/go-ssbu-registration">GitHub Code!</a>
          </div>
        </div>
      </div>
    </footer>


  </div>
</div>
</template>

<style>

body {
  margin: 0px;
  background: #F7F5F7;
  text-align: center;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


.brand {
  display: flex;
  background: #811212;
  padding: 10px 100px;
}

.brand h1 {
  display: inline-block;
  background: #7e760d;
  padding: 10px;
  border-radius: 30px;
  font-size: 14px;
}

.brand h2 {
  font-size: 12px;
  padding: 10px;
  margin-top: 12px;
}

.main {
  padding: 20px 100px;
}

.pure-button {
  font-size: 10px;
}

h1 {
  font-size: 16px;
}

h2 {
  font-size: 12px;
}

.space-right {
  margin-right: 10px;
}

a {
  color: #7e760d;
}

.pure-button-primary {
  background-color: #000000;
  color: rgb(255, 255, 255);
  border-radius: 30px;
}

footer{
    display: flex;
  background: #811212;
  padding: 10px 100px;
}
</style>
