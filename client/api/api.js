import axios from 'axios';

export const getArticles = async () => {
    const result = await axios.get("http://localhost:3001/articles")
    return result.data
}

export const getSingleArticle = async (id) => {
    const result = await axios.get(`http://localhost:3001/articles/${id}`)
    return result.data
}