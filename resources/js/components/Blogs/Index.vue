<template>
    <div class="container blog-table">
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Content</th>
                    <th>Created At</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="blog in blogs.data">
                    <td>
                        {{ blog.id }}
                    </td>
                    <td>
                        {{ blog.title }}
                    </td>
                    <td>
                        {{ blog.content }}
                    </td>
                    <td>
                        {{ blog.created_at }}
                    </td>
                    <td>
                        <router-link :to="{ name: 'blogs.edit', params: { id: blog.id } }" class="btn btn-sm btn-primary">Edit</router-link>
                        <a href="#" @click.prevent="deleteBlog(blog.id)" class="mx-3 btn btn-sm btn-warning">Delete</a>
                    </td>
                </tr>
                <tr v-if="blogs.data && blogs.data.length == 0">
                    <td colspan="5" class="text-center">Blog does not exist</td>
                </tr>
            </tbody>
            <Pagination :data="blogs" :limit="3" @pagination-change-page="page => getBlogs(page)" class="mt-4" />            
        </table>
    </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import useBlogs from "../../composables/blogs";

export default {
    setup() {
        const { blogs, getBlogs, deleteBlog } = useBlogs()
        onMounted(() => {
            getBlogs()
        })

        return {
            blogs,
            getBlogs,
            deleteBlog
        }
    }
}
</script>

<style>
.blog-table{
    margin-top: 100px;
}
</style>
