import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { serverEndpoint } from '../../config/config';
import { Modal } from 'react-bootstrap';
import { usePermission } from '../../rbac/permissions';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { useNavigate } from 'react-router-dom';


function LinkDashboard() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [linksData, setLinksData] = useState([]);
    const [formData, setFormData] = useState({
        campaignTittle: '',
        originalUrl: '',
        category: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const permission = usePermission();


    const handleModalShow = (isEdit, data = {}) => {
        if (isEdit) {
            setFormData({
                id: data._id,
                campaignTittle: data.campaignTittle,
                originalUrl: data.originalUrl,
                category: data.category
            });
        } else {
            setFormData({
                campaignTittle: '',
                originalUrl: '',
                category: ''
            });
        }
        setIsEdit(isEdit);
        setShowModal(true);
    };
    const handleModalClose = () => {
        setShowModal(false);
    };
    const [showDeleteModal, setShowDeleteModal] =
        useState(false);
    const handleDeleteModalShow = (linkId) => {
        setFormData({
            id: linkId
        });
        setShowDeleteModal(true);
    };
    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
    };
    const handleDeleteSubmit = async () => {
        try {
            await axios.delete(`${serverEndpoint}/links/${formData.id}`,
                { withCredentials: true });
            setFormData({
                campaignTittle: '',
                originalUrl: '',
                category: ''
            });
            fetchLinks();
        } catch (error) {
            setErrors({ message: 'Something went wrong, please try again' });

        } finally {
            handleDeleteModalClose();
        }
    };
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const validate = () => {
        let newErrors = {};
        let isValid = true;
        if (formData.campaignTittle.length === 0) {
            newErrors.campaignTittle = "Campaign Tittle is mandatory";
            isValid = false;
        }

        if (formData.originalUrl.length === 0) {
            newErrors.originalUrl = "Original URL is mandatory";
            isValid = false;
        }

        if (formData.category.length === 0) {
            newErrors.category = "Category is mandatory";

            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validate()) {
            const body = {
                campaign_tittle: formData.campaignTittle,
                original_url: formData.originalUrl,
                category: formData.category
            };
            const configuration = {
                withCredentials: true
            };
            try {
                if (isEdit) {
                    await axios.post(`${serverEndpoint}/links/${formData.id}`, body, configuration);
                }
                else {
                    await axios.post(`${serverEndpoint}/links`, body, configuration);

                }
                setFormData({
                    campaignTittle: '',
                    originalUrl: '',
                    category: ''
                });

                fetchLinks();
            } catch (error) {
                if (error.response?.data?.code === "INSUFFICIENT_FUNDS") {
                    setErrors({
                        message: "You do not have enough credits to perform this action. Add funds to your account using Manage payment option"
                    });
                }
                else {
                    setErrors({ message: 'Something went wrong, please try again' });
                }
            } finally {
                handleModalClose();
            }
        }
    };



    const fetchLinks = async () => {
        try {
            const response = await axios.get(`${serverEndpoint}/links`, {
                withCredentials: true
            });
            setLinksData(response.data.data);

        } catch (error) {
            console.log(error);
            setErrors({ message: "Unable to fetch links at the moment, please try again" });
        }
    };
    useEffect(() => {
        fetchLinks();
    }, []);
    const columns = [
        { field: 'campaignTittle', headerName: 'Campaign', flex: 2 },
        {
            field: 'originalUrl', headerName: 'URL', flex: 3, renderCell: (params) => (
                <a href={`${serverEndpoint}/links/r/${params.row._id}`} target="_blank" rel="noopener noreferrer">
                    {params.row.originalUrl}
                </a>
            ),
        },
        { field: 'category', headerName: 'Category', flex: 2 },
        { field: 'clickCount', headerName: 'Clicks', flex: 1 },
        {
            field: 'action', headerName: 'Action', flex: 1, renderCell: (params) => (
                <>
                    {permission.canEditLink && (
                        <IconButton onClick={() => handleModalShow(true, params.row)}>
                            <EditIcon />
                        </IconButton>
                    )}
                    {permission.canDeleteLink && (
                        <IconButton onClick={() => handleDeleteModalShow(params.row._id)}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                    {permission.canViewLink && (
                        <IconButton>
                            <AssessmentIcon onClick={() => {
                                navigate(`/analytics/${params.row._id}`);
                            }} />
                        </IconButton>
                    )}

                </>
            )
        }

    ];


    return (
        <div className="container py-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Manage Affiliate Links</h2>
                {permission.canCreateLink && (
                    <button className="btn btn-primary btn-lg fw-bold shadow-sm" onClick={() => handleModalShow(false)}>
                        Add
                    </button>
                )}
            </div>


            {errors.message && (<div className="alert alert-danger"
                role="alert">
                {errors.message}
            </div>
            )}
            <div style={{ height: 500, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={linksData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 20, page: 0
                            },
                        }
                    }}
                    rowsPerPageOptions={[20, 50, 100]}
                    disableRowSelectionOnClick
                    showToolbar
                    sx={{
                        fontFamily: "inherit"
                    }}
                />
            </div>
            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? "Edit Link" : "Add Link"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="campaignTittle" className="form-label">
                                Campaign Title
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.campaignTittle ? 'is-invalid' : ''}`}
                                id="campaignTittle"
                                name="campaignTittle"
                                value={formData.campaignTittle}
                                onChange={handleChange}
                            />
                            {errors.campaignTittle && (
                                <div className="invalid-feedback">
                                    {errors.campaignTittle}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="originalUrl" className="form-label">
                                Original URL
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.originalUrl ? 'is-invalid' : ''}`}
                                id="originalUrl"
                                name="originalUrl"
                                value={formData.originalUrl}
                                onChange={handleChange}
                            />
                            {errors.originalUrl && (
                                <div className="invalid-feedback">
                                    {errors.originalUrl}
                                </div>
                            )}
                        </div>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">
                                Category
                            </label>
                            <input
                                type="text"
                                className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                                id="category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                            />
                            {errors.category && (
                                <div className="invalid-feedback">
                                    {errors.category}
                                </div>
                            )}
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal()}>
                <Modal.Header closeButton>

                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body> Are you sure you want to delete this link?
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowDeleteModal()}> Cancel
                    </button>
                    <button className="btn btn-danger" onClick={handleDeleteSubmit}> Delete
                    </button>
                </Modal.Footer>
            </Modal>

        </div>

    );

}
export default LinkDashboard;