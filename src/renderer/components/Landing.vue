<template>
    <div class="wraper">
        <H1>С чего начнем?</H1>
        <div class="holder">
            <router-link to='/new_project' class="btn">Создать</router-link>
            <router-link to='/open' class="btn">Редактировать</router-link>
            <router-link to='/view' class="btn">Просмотреть</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    methods:{

    }
}
</script>

<style>
body{
    background-color: rgb(42, 119, 219);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
}
h1{
    text-align: center;
    margin-top: 120px;
}
.btn{
    width: 150px;
    /* height: 150px; */
    margin: 8px;
    padding: 65px 0px;
    border: 2px solid rgb(78, 78, 78);
    border-radius: 75px;
    background-color: #fff;
    color: rgb(78, 78, 78);
    display: inline-block;
    text-align: center;
    cursor: pointer;
    user-select: none;
}
.holder{
    margin-top: 20px;
     
}
.btn:hover{
    background-color: rgb(222, 238, 252);
    border-radius: 77px;
    width: 154px;
    padding: 67px 0px;
    margin: 6px;
    transition: ease-out 0,5s;
}
.btn:active{
    background-color: rgba(222, 238, 252, 0.9);
    border-color: rgb(158, 155, 155);
    border-width: 2px;
}
</style>

