'use client'


// import * as Yup from "yup";
import css from "./NoteForm.module.css";
import { useMutation} from "@tanstack/react-query";
import { createNote } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useNoteDraftStore } from "@/lib/stores/noteStore";
import { NewNoteData } from "@/types/note";



// const validationSchema = Yup.object({
//     title: Yup.string().min(3).max(50).required(),
//     content: Yup.string().max(500),
//     tag: Yup.mixed().oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping']).required(),
// });


//     interface NoteFormProps {
//         onClose: () => void;
// }

export default function NoteForm () {
    // const queryClient = useQueryClient();
    const router = useRouter();

    const { draft, setDraft, clearDraft } = useNoteDraftStore();

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) => {
        setDraft({
            ...draft,
            [event.target.name]: event.target.value,
        });
    };

    
     const mutation = useMutation({
         mutationFn: createNote,
         onSuccess: () => {
             clearDraft();
             router.push('/notes/filter/all');
         },
         onError: (error) => {
            console.error('Create note failed:', error);
          },
     });
    
    const handleSubmit = (formData: FormData) => {
        const values = Object.fromEntries(formData) as NewNoteData;
        mutation.mutate(values);
    };

    const handleCancel = () => router.push('/notes/filter/all');


    return (
        <form action={handleSubmit} className={css.form}>
        
                    <div className={css.formGroup}>
                        <label htmlFor="title">Title</label>
                        <input type="text" name="title" className={css.input} defaultValue={draft?.title} onChange={handleChange}/>
        
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="content">Content</label>
                        <textarea
            name="content"
                            rows={8}
                    className={css.textarea}
                    defaultValue={draft?.content}
                    onChange={handleChange}
                        />
            
                    </div>

                    <div className={css.formGroup}>
                        <label htmlFor="tag">Tag</label>
                        <select id="tag" name="tag" className={css.select} defaultValue={draft?.tag} onChange={handleChange}>
                            <option value="Todo">Todo</option>
                            <option value="Work">Work</option>
                            <option value="Personal">Personal</option>
                            <option value="Meeting">Meeting</option>
                            <option value="Shopping">Shopping</option>
                        </select>
                    </div>

                    <div className={css.actions}>
                       <button
                            type="submit"
                    className={css.submitButton}
    >
                            Create note
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className={css.cancelButton}
                        >Cancel</button>
                    </div>
        </form>
    );
}