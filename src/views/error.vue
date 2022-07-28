<template>
  <div class="error">
    <div style="height: auto; min-height: 100%">
      <div
        style="
          text-align: center;
          width: 800px;
          margin-left: -400px;
          position: absolute;
          top: 30%;
          left: 50%;
        "
      >
        <h1
          style="
            margin: 0;
            font-size: 150px;
            line-height: 150px;
            font-weight: bold;
          "
        >
          404
        </h1>
        <h2 style="margin-top: 20px; font-size: 30px">Not Found</h2>
        <p>The resource requested could not be found on this server!</p>
        <div class="button">
          <h2>
            <router-link to="/Home/Index" style="color: #444"
              >去首页</router-link
            >
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style  scoped>
body {
  color: #444;
  margin: 0;
  font: normal 14px/20px Arial, Helvetica, sans-serif;
  height: 100%;
  background-color: #fff;
}
.error {
  text-align: center;
  margin-top: 25px;
  height: 600px;
}
.aaa {
  font-size: 250px;
  color: white;
  font-family: "方正舒体";
}
.bbb {
  font-size: 80px;
  color: white;
  font-family: "方正舒体";
}
</style>
