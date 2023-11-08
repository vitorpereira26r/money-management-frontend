import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { UserEditDto } from '../../entities/User/User';
import { Modal } from '../../components/Modal/Modal';

export const UserConfig: React.FC = () => {

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const[username, setUsername] = useState<string>("");
  const[password, setPassword] = useState<string>("");

  const[isDeleteModalOpen, setIsDeleteModalOpen] =useState(false);
  
  const[usernameLengthOk, setUsernameLengthOk] = useState<boolean>(true);
  const[passwordLengthOk, setPasswordLengthOk] = useState<boolean>(true);

  useEffect(() => {
    if(auth.user){
        setUsername(auth.user?.username);
    }
  }, []);

  const handleUsernameInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setUsernameLengthOk(true);
  }

  const handlePasswordInput = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordLengthOk(true);
  }

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  }

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  }

  const handleConfirmDelete = async () => {
    if(auth.user){
        await auth.deleteUser(auth.user.id);
        navigate("/")
    }
  }

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(username.length < 2 || username.length > 40){
        setUsernameLengthOk(false);
    }
    else if(password.length < 8 || password.length > 40){
        setPasswordLengthOk(false);
    }
    else{
        if(auth.user && username && password && username != "" && password != ""){
            const user: UserEditDto = {
                username: username,
                password: password
            }

            const isEdited = await auth.editUser(user, auth.user?.id);
            if(isEdited){
                navigate("/home");
            }
            setPassword("");
            setUsername("");
        }
    }
  }

  return (
    <div className="container mt-4">
        <h2>Configure User Info</h2>
        <div>
            <form className='mt-3' onSubmit={handleEditSubmit}>
                <h3>Edit User info</h3>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className={`form-control ${!usernameLengthOk ? "is-invalid" : ""} mb-2`}
                        id="username"
                        name="username"
                        value={username}
                        onChange={handleUsernameInput}
                        required
                    />
                    {!usernameLengthOk && (
                        <div className="alert alert-danger" role="alert">
                        Username must have between 2 and 40 characters.
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className={`form-control ${!passwordLengthOk ? "is-invalid" : ""} mb-2`}
                        id="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordInput}
                        required
                    />
                    {!passwordLengthOk && (
                        <div className="alert alert-danger" role="alert">
                        Password must have between 8 and 40 characters.
                        </div>
                    )}
                </div>
                <button type="submit" className="btn btn-primary">
                    Edit User
                </button>
            </form>
            <div>
                <h3 className='mt-3'>Delete User</h3>
                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={openDeleteModal}
                >
                    Delete User
                </button>
            </div>
        </div>

        <Modal title="Delete Confirmation" isOpen={isDeleteModalOpen} onClose={handleCancelDelete}>
            <div className="modal-body">
            <p className="text-muted">Are you sure you want to delete this account?</p>
            </div>
            <div className="modal-footer">
            <button type="button" className="btn btn-primary" onClick={handleConfirmDelete}>
                Confirm
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleCancelDelete}>
                Cancel
            </button>
            </div>
        </Modal>
    </div>
  )
}
