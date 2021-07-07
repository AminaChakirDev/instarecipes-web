import CreateCategory from "./CreateCategory";
import UploadPoster from "./UploadPoster";

function AdminCategories() {
    return (
        <div>
            <h2>Page Admin Categories</h2>
            <CreateCategory/>

            <UploadPoster />
        </div>
    );
}

export default AdminCategories;
