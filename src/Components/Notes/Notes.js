import './Notes.scss';

const Notes = () => {
    return (
        <div className="notes">
            <h2 className="notes__title">Notes</h2>
            <textarea

                className="notes__text-input"
                type="text"
            
            ></textarea>

        </div>
    )
}

export default Notes