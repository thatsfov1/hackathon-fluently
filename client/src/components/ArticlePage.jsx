import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getSingleArticle } from '../../api/api';

export const ArticlePage = () => {


    const { id } = useParams()

    const { data: article, status, error } = useQuery({
        queryKey: ['article', id],
        queryFn: () => getSingleArticle(id)
    })

    if (status === 'loading') return <h1>Loading</h1>
    if (status === 'error') return <h1>{JSON.stringify(error)}</h1>
    return (
        <div>
            <p>{article?.title}</p>
            <div className='mt-10'>{article?.article}</div>
        </div>
    )
}
