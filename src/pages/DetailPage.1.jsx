import React, { useEffect } from 'react';
import { useParams } from 'react-router';

export function DetailPage() {
    const param = useParams();
    console.log(param.id);

    useEffect(() => {
        // const selectedPost
    });
    return <div>DetailPage</div>;
}
