<script setup>

</script>

<template>
    <footer>
        <div class="footer-left">
            <h3>联系我们</h3>
            <p>地址：123 Street, City, Country</p>
            <p>电话：123-456-7890</p>
            <p>邮箱：info@example.com</p>
        </div>
        <div class="footer-center">
            <h3>关注我们</h3>
            <div class="social-links">
                <a href="#" class="facebook"><i class="fab fa-facebook-f"></i></a>
                <a href="#" class="twitter"><i class="fab fa-twitter"></i></a>
                <a href="#" class="instagram"><i class="fab fa-instagram"></i></a>
            </div>
        </div>
        <div class="footer-right">
            <h3>公司信息</h3>
            <ul>
                <li><a href="#">隐私政策</a></li>
                <li><a href="#">服务条款</a></li>
                <li><a href="#">网站地图</a></li>
            </ul>
            <p>&copy; 2024 Tetris Game. All rights reserved.</p>
        </div>
    </footer>
</template>


<style lang="scss" scoped>
footer {
    background-color: #333;
    color: #fff;
    padding: 20px;
    text-align: center;

    p {
        margin: 5px 0;
    }

    .footer-left,
    .footer-center,
    .footer-right {
        display: inline-block;
        vertical-align: top;
        width: 33.33%;
    }

    .footer-center {
        text-align: center;
    }

    .footer-right {
        text-align: right;

        ul {
            list-style-type: none;
            padding: 0;
        }

        li {
            margin-right: 10px;

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

.social-links {
    a {
        color: #fff;
        margin: 0 5px;

        :hover {
            text-decoration: none;
        }
    }
}
</style>