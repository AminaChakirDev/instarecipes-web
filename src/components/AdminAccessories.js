import CreateAccessory from "./CreateAccessory";
import UploadPoster from "./UploadPoster";
import DeleteAccessory from "./DeleteAccessory";
import {Link} from "react-router-dom";

function AdminAccessories() {
    return (
        <div>
            <h2>Page Admin Accessoires</h2>
            <CreateAccessory/>
            <DeleteAccessory/>

            <UploadPoster />
        </div>
    );
}

export default AdminAccessories;
