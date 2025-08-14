'use client';

import css from './NotePreview.module.css';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import Modal from '@/components/Modal/Modal';

type Props = {
    id: string;
}

export default function NotePreview({ id }: Props) {
    const router = useRouter();
    
    const handleClickClose = () => {
        router.back()
    };
   
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    });
    
     if (isLoading) return <p>Loading, please wait...</p>;
  if (isError) return <p>Something went wrong.</p>;
  if (!data) return <p>Note not found</p>

    return (
        <Modal onClose={handleClickClose}>
        <div className={css.container}>
	<div className={css.item}>
	  <div className={css.header}>
                    <h2>{data.title}</h2>
	  </div>
                <p className={css.content}>{data.content}</p>
                <p className={css.date}>{new Date(data.createdAt).toLocaleString()}</p>
                </div>
                <button onClick={handleClickClose} className={css.backBtn}>Close</button>
            </div>
            </Modal>
    );


}