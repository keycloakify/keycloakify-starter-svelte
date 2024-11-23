<script lang="ts">
  import { fade } from 'svelte/transition';
</script>

<div
  class="wrapper"
  transition:fade
>
  <h1>
    Loading data...
    <div class="loader"></div>
  </h1>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    color: #e63800;
    background: rgb(255 255 255 / 0.9);
  }

  /* spinner from https://projects.lukehaas.me/css-loaders/ */
  .loader {
    color: #e63800;
    font-size: 10px;
    margin: 3rem auto 0;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    position: relative;
    text-indent: -9999em;
    -webkit-animation: load4 1.3s infinite linear;
    animation: load4 1.3s infinite linear;
    -webkit-transform: translateZ(0);
    -ms-transform: translateZ(0);
    transform: translateZ(0);
  }
  @-webkit-keyframes load4 {
    0%,
    100% {
      box-shadow:
        0 -3em 0 0.2em,
        2em -2em 0 0em,
        3em 0 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 -1em,
        -3em 0 0 -1em,
        -2em -2em 0 0;
    }
    12.5% {
      box-shadow:
        0 -3em 0 0,
        2em -2em 0 0.2em,
        3em 0 0 0,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 -1em,
        -3em 0 0 -1em,
        -2em -2em 0 -1em;
    }
    25% {
      box-shadow:
        0 -3em 0 -0.5em,
        2em -2em 0 0,
        3em 0 0 0.2em,
        2em 2em 0 0,
        0 3em 0 -1em,
        -2em 2em 0 -1em,
        -3em 0 0 -1em,
        -2em -2em 0 -1em;
    }
    37.5% {
      box-shadow:
        0 -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0em 0 0,
        2em 2em 0 0.2em,
        0 3em 0 0em,
        -2em 2em 0 -1em,
        -3em 0em 0 -1em,
        -2em -2em 0 -1em;
    }
    50% {
      box-shadow:
        0 -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0 0 -1em,
        2em 2em 0 0em,
        0 3em 0 0.2em,
        -2em 2em 0 0,
        -3em 0em 0 -1em,
        -2em -2em 0 -1em;
    }
    62.5% {
      box-shadow:
        0 -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 0,
        -2em 2em 0 0.2em,
        -3em 0 0 0,
        -2em -2em 0 -1em;
    }
    75% {
      box-shadow:
        0em -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0em 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 0,
        -3em 0em 0 0.2em,
        -2em -2em 0 0;
    }
    87.5% {
      box-shadow:
        0em -3em 0 0,
        2em -2em 0 -1em,
        3em 0 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 0,
        -3em 0em 0 0,
        -2em -2em 0 0.2em;
    }
  }
  @keyframes load4 {
    0%,
    100% {
      box-shadow:
        0 -3em 0 0.2em,
        2em -2em 0 0em,
        3em 0 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 -1em,
        -3em 0 0 -1em,
        -2em -2em 0 0;
    }
    12.5% {
      box-shadow:
        0 -3em 0 0,
        2em -2em 0 0.2em,
        3em 0 0 0,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 -1em,
        -3em 0 0 -1em,
        -2em -2em 0 -1em;
    }
    25% {
      box-shadow:
        0 -3em 0 -0.5em,
        2em -2em 0 0,
        3em 0 0 0.2em,
        2em 2em 0 0,
        0 3em 0 -1em,
        -2em 2em 0 -1em,
        -3em 0 0 -1em,
        -2em -2em 0 -1em;
    }
    37.5% {
      box-shadow:
        0 -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0em 0 0,
        2em 2em 0 0.2em,
        0 3em 0 0em,
        -2em 2em 0 -1em,
        -3em 0em 0 -1em,
        -2em -2em 0 -1em;
    }
    50% {
      box-shadow:
        0 -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0 0 -1em,
        2em 2em 0 0em,
        0 3em 0 0.2em,
        -2em 2em 0 0,
        -3em 0em 0 -1em,
        -2em -2em 0 -1em;
    }
    62.5% {
      box-shadow:
        0 -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 0,
        -2em 2em 0 0.2em,
        -3em 0 0 0,
        -2em -2em 0 -1em;
    }
    75% {
      box-shadow:
        0em -3em 0 -1em,
        2em -2em 0 -1em,
        3em 0em 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 0,
        -3em 0em 0 0.2em,
        -2em -2em 0 0;
    }
    87.5% {
      box-shadow:
        0em -3em 0 0,
        2em -2em 0 -1em,
        3em 0 0 -1em,
        2em 2em 0 -1em,
        0 3em 0 -1em,
        -2em 2em 0 0,
        -3em 0em 0 0,
        -2em -2em 0 0.2em;
    }
  }
</style>
