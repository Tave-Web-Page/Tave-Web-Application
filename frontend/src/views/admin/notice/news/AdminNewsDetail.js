import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import TitleTile from '../../utils/newTiles/TitleTile';
import ContentTile from '../../utils/newTiles/ContentTile';
import ImageTile from '../../utils/newTiles/ImageTile';
import DatetimeTile from '../../utils/newTiles/DatetimeTile';
import { useConfirm } from '../../utils/alert/confirm';

export default function AdminNewsDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [news, setNews] = useState({});

    useEffect(() => {
        axios.get(`/api/news/${id}`).then((response) => {
            console.log('response', response);
            console.log('response', response.data);
            setNews(response.data['news']);
        });
    }, [id]);

    const handleTitle = async (newTitle) => {
        const response = await axios.patch(`/api/news/${id}`, {
            title: newTitle,
        });

        setNews({
            ...news,
            title: response.data['title'],
        });
    };
    const handleContent = async (newContent) => {
        const response = await axios.patch(`/api/news/${id}`, {
            content: newContent,
        });

        setNews({
            ...news,
            content: response.data['content'],
        });
    };

    const handleUpdateImage = async (id, image, description) => {
        const data = new FormData();

        data.append('image', image);
        data.append('image_description', description);

        const response = await axios.patch(`/api/news/image/${id}`, data, {
            body: {
                'Content-Type': 'multipart/form-data',
            },
        });

        console.log(response.data);

        if (response.status === 200) {
            setNews({
                ...news,
                Images: news.Images?.map((image) =>
                    image.id === id
                        ? {
                              ...image,
                              image_url: response.data['image_url'],
                              image_description:
                                  response.data['image_description'],
                          }
                        : image
                ),
            });
        }
    };

    const handleRemoveImage = async (id) => {
        const response = await axios.delete(`/api/news/image/${id}`);

        console.log(response.data);

        if (response.status === 200) {
            setNews({
                ...news,
                Images: news.Images?.filter((image) => image.id !== id),
            });
        }
    };

    const deleteConfirm = async () => {
        console.log('??????????????????.');
        try {
            const response = await axios.delete(`/api/news/${id}`);
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
        navigate(-1);
    };
    const cancelConfirm = () => {
        console.log('??????????????????.');
    };

    const confirmDelete = useConfirm(
        '?????????????????????????',
        deleteConfirm,
        cancelConfirm
    );

    return (
        <Fragment>
            <Grid item xs={12} align={'right'} sx={{ mb: 1 }}>
                <Button
                    variant="contained"
                    color="error"
                    endIcon={<DeleteForeverIcon />}
                    onClick={confirmDelete}
                >
                    ??????
                </Button>
            </Grid>
            <DatetimeTile
                createdAt={news?.created_at}
                updatedAt={news?.updated_at}
            />
            <TitleTile title={news.title} handleTitle={handleTitle} />
            <ContentTile content={news.content} handleContent={handleContent} />
            <Typography variant="body2">
                {news.Images?.map((image) => {
                    return (
                        <ImageTile
                            id={image.id}
                            url={image.image_url}
                            description={image.image_description}
                            onUpdateImage={handleUpdateImage}
                            onRemoveImage={handleRemoveImage}
                        />
                    );
                })}
            </Typography>
        </Fragment>
    );
}
