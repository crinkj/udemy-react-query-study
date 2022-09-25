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

    const updateMutation = useMutation(() => updatePost(post.id))

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
       {deleteMutation.isLoading &&(
        <p style={{ color: "blue" }}> deleting the post </p>
      )}
       {deleteMutation.isSuccess &&(
        <p style={{ color: "green" }}>Post has (not) been deleted </p>
      )}
      <button onClick={() => updateMutation.mutate(post.id)}>Update title</button>
       {updateMutation.isLoading &&(
        <p style={{ color: "blue"}}>updating the post! wait bruh</p>
      )}
       {updateMutation.isSuccess &&(
        <p style={{ color: "green"}}>not updated yet</p>
      )}
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
