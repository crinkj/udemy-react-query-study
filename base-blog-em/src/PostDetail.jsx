import {useMutation,useQuery } from "react-query";

async function fetchComments(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
  );
  return response.json();
}

async function deletePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "DELETE" }
  );
  return response.json();
}

const deleteMutation = useMutation((postId) => deletePost(postId))
async function updatePost(postId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/postId/${postId}`,
    { method: "PATCH", data: { title: "REACT QUERY FOREVER!!!!" } }
  );
  return response.json();
}
  
export function PostDetail({ post }) {
  // replace with useQuery
  const {data, isError, error, isLoading} = useQuery(
      ["comments",post.id], 
      () => fetchComments(post.id)
    );

    const deleteMutation = useMutation((postId) => deletePost(postId))

  if(isError)
  return (
    <>
      <h3 style={{color:"red"}}>error is occurred(reason: {error.toString()})</h3>
    </>
  )

  if(isLoading)
  return (
    <>
      <h3 style={{color:"blue"}}>bruh, it takes forever</h3>
    </>
  )

  return ( 
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button> 
      {deleteMutation.isError &&(
        <p style={{ color: "red" }}>Error deleting the post </p>
      )}
      <button>Update title</button>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
