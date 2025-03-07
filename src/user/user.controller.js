import { hash, verify } from "argon2";
import User from "./user.model.js";


export const adminDefaultCreated = async (req, res) => {
    try{

        const defaultAdmin = await User.findOne({ email: "Dabp@gmail.com" });
        const encryptedPassword = await hash("dBerc1an!")

        if(!defaultAdmin){
            const newAdmin = new User({
                fullName: "Diego Bercian",
                username: "Dabpp",
                email: "Dabp@gmail.com",
                password: encryptedPassword,
                phone: "49099817",
                role: "ADMIN_ROLE"
            })
    
            await newAdmin.save();
        }

    }catch(err){
        return res.status(500).json({
            message: "Error al crear el administrador general",
            error: err.message
        });
    }
};


export const updateUser = async (req, res) => {
    try {
        const data = req.body;
        const user = req.usuario

        const updatedUser = await User.findByIdAndUpdate(user._id, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            user: updatedUser,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
};


export const editRole = async (req, res) => {
    try {
        const { role } = req.body;
        const { uid } = req.params;


        const userToUpdate = await User.findById(uid);

        if (!userToUpdate) {
            return res.status(404).json({
                success: false,
                msg: 'Usuario no encontrado'
            });
        }

        if (userToUpdate.role === 'ADMIN_ROLE') {
            return res.status(403).json({
                success: false,
                msg: 'No puedes modificar a otro administrador'
            });
        }

        userToUpdate.role = role;
        const updatedUser = await userToUpdate.save();

        res.status(200).json({
            success: true,
            msg: 'Usuario actualizado exitosamente',
            user: updatedUser,
        });

    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
};



export const deleteUser = async (req, res) => {
    try{
        const userT = req.usuario
        const { password } = req.body;

        const user = await User.findById(userT._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        const validPassword = await verify(user.password, password);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: "Contraseña incorrecta"
            });
        }

        await User.findByIdAndDelete(userT._id);

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        });
    }
};



export const updateUserAdmin = async (req, res) => {
    try {
        const { uid } = req.params
        const data  = req.body;

      
        const userUpdate = await User.findById(uid);

        if (!userUpdate) {
            return res.status(404).json({
                success: false,
                msg: 'Usuario no encontrado'
            });
        }

        if (userUpdate.role === 'ADMIN_ROLE') {
            return res.status(403).json({
                success: false,
                msg: 'No puedes modificar a otro administrador'
            });
        }

        const updatedUser = await User.findByIdAndUpdate(uid, data, { new: true });

        res.status(200).json({
            success: true,
            msg: 'Usuario Actualizado',
            user: updatedUser,
        });

    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar usuario',
            error: err.message
        });
    }
};
