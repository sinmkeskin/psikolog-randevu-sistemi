"use client";

import React, { useEffect, useState } from "react";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API'den blogları al
    fetch("healthymind.infinityfreeapp.com/getBlogs.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.blogs) {
          setBlogs(data.blogs);
        } else {
          alert("Bloglar alınırken bir hata oluştu.");
        }
      })
      .catch((error) => {
        console.error("API Hatası:", error);
        alert("Bloglar alınırken bir hata oluştu.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Bloglar</h1>
      {blogs.length > 0 ? (
        <div>
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-lg p-6 mb-4"
            >
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-500 text-sm mb-4">
                {new Date(blog.created_at).toLocaleDateString()} <br />
                <strong>Yazan:</strong> {blog.doctor_name} ({blog.doctor_email})
              </p>
              <p className="text-gray-700">{blog.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Henüz blog bulunmamaktadır.</p>
      )}
    </div>
  );
};

export default BlogsPage;
