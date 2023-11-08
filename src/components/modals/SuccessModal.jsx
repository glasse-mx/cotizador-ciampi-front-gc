import { Box, Button, Modal, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";


export const SuccessModal = ({ open, handleClose, title, message, leadTo }) => {

    // Creamos los estilos basicos del modal
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        textAlign: 'center'
    };

    // Creamos el navegador para llevar al usuario al dashboard una vez se apruebe el inicio de sesion
    const navigate = useNavigate()


    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>


                <span class="material-symbols-rounded semibold">
                    check_circle
                </span>

                <h4 className="semibold">{title}</h4>

                {
                    message && (
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                        </Typography>
                    )
                }

                <Button onClick={() => navigate(leadTo)}>
                    Continuar
                </Button>
            </Box>
        </Modal>
    )
}
