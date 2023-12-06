'use client'; // 이 부분을 추가

import React, { useState, useEffect } from 'react';

const BoardList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 여기서 서버에서 게시판 데이터를 가져오는 API 호출을 수행합니다.
    // 예를 들어, axios 또는 fetch를 사용할 수 있습니다.
    // 아래는 가상의 코드입니다.
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://your-api-url/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-6">게시판 리스트</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className="mb-4">
            <h2 className="text-xl font-bold">{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
      <div class="flex flex-col dark:text-gray-400 dark:bg-gray-800">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Date
                    </th>
                    <th
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th scope="col" class="relative px-6 py-3">
                      <span class="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200 dark:text-gray-400 dark:bg-gray-800" id="rows"></tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;
