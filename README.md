# Portfolio
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Isometric Drawer Portfolio</title>
  <style>
    body {
      background: #f7f7f7;
      font-family: sans-serif;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .cabinet {
      width: 400px;
      cursor: pointer;
    }

    .drawer {
      transition: transform 0.4s ease;
    }

    .drawer:hover {
      transform: translateX(5px);
    }

    .drawer.open {
      transform: translateX(20px);
    }

    text {
      font-family: sans-serif;
      font-size: 12px;
      pointer-events: none;
    }
  </style>
</head>
<body>

<div class="cabinet">
  <svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg">
    <!-- Drawer 1 -->
    <g class="drawer" data-link="/project-1">
      <polygon points="20,20 150,20 140,40 10,40" stroke="#333" fill="none" stroke-width="2"/>
      <text x="30" y="35">Project 1</text>
    </g>

    <!-- Drawer 2 -->
    <g class="drawer" data-link="/project-2">
      <polygon points="20,60 150,60 140,80 10,80" stroke="#333" fill="none" stroke-width="2"/>
      <text x="30" y="75">Project 2</text>
    </g>

    <!-- Drawer 3 -->
    <g class="drawer" data-link="/project-3">
      <polygon points="20,100 150,100 140,120 10,120" stroke="#333" fill="none" stroke-width="2"/>
      <text x="30" y="115">Project 3</text>
    </g>
  </svg>
</div>

<script>
  document.querySelectorAll('.drawer').forEach(drawer => {
    drawer.addEventListener('click', () => {
      drawer.classList.add('open');
      const link = drawer.dataset.link;
      setTimeout(() => {
        window.location.href = link;
      }, 500);
    });
  });
</script>

</body>
</html>
