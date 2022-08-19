<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\SignUpRequest;
use App\Http\Requests\Blog\StoreBlogRequest;
use App\Http\Requests\Blog\UpdateBlogRequest;
use App\Http\Resources\Blog\BlogCollection;
use App\Http\Resources\Blog\BlogResource;
use App\Models\Blog;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class BlogController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function index(Request $request)
    {
        $blogs = Blog::where('user_id', Auth::user()->id)->with(['owner']);
        return response()->json([
            'status' => 'success',
            'blogs' => new BlogCollection($blogs->paginate($request['per_page'], ['*'], 'page', $request['page'] ?? 20))
        ]);
    }

    public function store(StoreBlogRequest $request)
    {
        if($request->validated()){
            $blog = Blog::create($request->validated());

            return response()->json([
                'status' => 'success',
                'message' => 'Blog created successfully',
                'blog' => new BlogResource($blog->load('owner'))
            ]);
        }

        
    }

    public function show($id)
    {
        return response()->json([
            'status' => 'success',
            'blog' => new BlogResource(Blog::with(['owner'])->find($id))
        ]);
    }

    public function update(UpdateBlogRequest $request, $id)
    {
        if($request->validated()){
            Blog::where('id', $id)->where('user_id', Auth::user()->id)->update($request->validated());

            return response()->json([
                'status' => 'success',
                'message' => 'Blog updated successfully',
            ]);
        }        
    }

    public function destroy($id)
    {
        $deleteStatus = Blog::where('id', $id)->where('user_id', Auth::user()->id)->delete();
        if($deleteStatus){
            return response()->json([
                'status' => 'success',
                'message' => 'Blog deleted successfully',
            ]);
        }
        
    }
}
