<template>
    <div class="bolg-create-area container">
        <h5 class="mt-5"> {{ blog.id === '' ? 'Create' : 'Edit' }} Blog </h5>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="blog-title">Title</label>
                <input type="text" v-model="blog.title" class="form-control" id="blog-title" aria-describedby="emailHelp" placeholder="Enter title">
                <div class="text-red-600 mt-1">
                    <div v-for="message in validationErrors?.title">
                        {{ message }}
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Content</label>
                <textarea v-model="blog.content" id="blog-content"  class="form-control" > </textarea>
                <div class="text-red-600 mt-1">
                    <div v-for="message in validationErrors?.content">
                        {{ message }}
                    </div>
                </div>
            </div>
            <div class="mt-4">
                <router-link class="btn mx-2 btn-danger" :to="{ name: 'blogs.index' }">Back</router-link>
                <button :disabled="isLoading" class="btn btn-primary ml-2" type="submit">
                    <div v-show="isLoading" class=""></div>
                    <span v-if="isLoading">Processing...</span>
                    <span v-else>Save</span>
                </button>
            </div>
        </form>
    </div>
</template>

<script>
import { onMounted, reactive, watchEffect } from "vue";
import useBlogs from "../../composables/blogs";
import { useRoute } from "vue-router";


export default {
    setup() {
        const { blog: blogData, storeBlog, updateBlog, getBlog, validationErrors, isLoading } = useBlogs()
        const route = useRoute()

        const blog = reactive({
            id: '',
            title: '',
            content: '',
        })

        function submitForm() {
            if(route.params.id !== undefined){
                updateBlog(blog)
            }else{
                storeBlog(blog)
            }
        }

        onMounted(() => {
            if(route.params.id){
                getBlog(route.params.id)
            }
        })

        watchEffect(() => {
            if(route.params.id){
                blog.id = blogData.value.id
                blog.title = blogData.value.title
                blog.content = blogData.value.content
            }
        })

        return {
            blog,
            validationErrors,
            isLoading,
            submitForm
        }
    }
}
</script>

<style>
.bolg-create-area{
    margin-top: 100px;
}

</style>
