<script setup>

</script>

<template>
    <header>
        <h1>Tetris Game</h1>
        <nav class="container">
            <ul>
                <li><a href="#">游戏说明</a></li>
                <li><a href="#">连线对战</a></li>
                <li><a href="#">帮助与支持</a></li>
                <li><a href="#">社区论坛</a></li>
                <li><a href="#">商品</a></li>
                <li><a href="#">会员页面</a></li>
            </ul>
        </nav>
    </header>
</template>


<style lang="scss" scoped>
header {
    background-color: #333;
    color: #fff;
    padding: 20px;
    text-align: center;

    h1 {
        margin: 0;
    }
}

nav {
    ul {
        list-style-type: none;
        padding: 0;

        li {
            display: inline;
            margin-right: 20px;
        }
    }

    a {
        color: #fff;
        text-decoration: none;

        :hover {
            text-decoration: underline;
        }
    }
}
</style>