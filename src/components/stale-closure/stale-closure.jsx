import React, { useState } from 'react'

const StaleClosure = () => {

    const [post, setPost] = useState(0);


    console.log("start");

setTimeout(() => console.log("timeout1"));

async function foo() {
  console.log("foo start");

  await Promise.resolve().then(() => {
    console.log("inner1");
  });

  await Promise.resolve().then(() => {
    console.log("inner2");
    setTimeout(() => console.log("timeout2"));
  });

  console.log("foo end");
}

foo();

Promise.resolve()
  .then(() => {
    console.log(1);
    return Promise.resolve(2);
  })
  .then((x) => {
    console.log(x);
    throw "err";
  })
  .catch(() => {
    console.log(3);
  })
  .then(() => {
    console.log(4);
  });

console.log("end");

    const handleClick = async () => {
        setTimeout(() => {
            setPost(post + 1)
        }, 2000);
    }

  return (
    <div>
        <h1>No of Post: {post}</h1>
        <button onClick={handleClick}>Click Stale Closure</button>
    </div>
  )
}

export default StaleClosure