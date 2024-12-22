import React, { useEffect, useState } from 'react'
import { WrapperContentProfile, WrapperHeader, WrapperInput, WrapperLabel, WrapperUploadFile } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { useDispatch, useSelector } from "react-redux";
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons'
import { getBase64 } from '../../utils';
import * as UserService from "../../services/UserService";
import * as message from '../../components/Message/Message'
import Loading from '../../components/LoadingComponent/Loading'
import { useMutationHooks } from '../../hooks/useMutationHook'
import { updateUser } from '../../redux/slices/userSlice';
import { Navigate } from 'react-router-dom';


const ProfilePage = () => {

    const user = useSelector((state) => state.user)
    console.log('user', user);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState('')

    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, ...rests } = data
            UserService.updateUser(id, access_token, rests)
        }
    )
    const { data, isPending, isSuccess, isError } = mutation
    console.log('data', mutation)
    const dispatch = useDispatch()


    useEffect(() => {
        // setLoading(true)
        setEmail(user?.email)
        setName(user?.name)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
        //setLoading(false)
    }, [user])

    useEffect(() => {
        //setLoading(true)
        if (isSuccess) {
            message.success()
            handleGetDetailsUser(user?.id, user?.access_token)
        } else if (isError) {
            message.error()
        }
        //setLoading(false)
    }, [isSuccess, isError])

    const handleGetDetailsUser = async (id, token) => {
        const res = await UserService.getDetailsUser(id, token)
        dispatch(updateUser({ ...res?.data, access_token: token }))

    }

    const handleNavigateProf = () => {
        Navigate("/profile-user");
    };
    const handleOnchangeEmail = (value) => {
        setEmail(value)
    }
    const handleOnchangeName = (value) => {
        setName(value)
    }

    const handleOnchangePhone = (value) => {
        setPhone(value)
    }
    const handleOnchangeAddress = (value) => {
        setAddress(value)
    }
    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        setAvatar(file.preview)
    }

    const handleUpdate = () => {

        mutation.mutate({ id: user?.id, email, name, phone, address, avatar, access_token: user?.access_token })
        setLoading(true)
        setLoading(false)


    }
    return (
        <div style={{ width: '1270px', margin: '0 auto', height: '500px' }}>
            <WrapperHeader>Thông tin người dùng </WrapperHeader>
            <Loading isLoading={loading}>
                <WrapperContentProfile>
                    <WrapperInput>
                        <WrapperLabel htmlFor="name">Name</WrapperLabel>
                        <InputForm style={{ with: '300px' }} id="name" value={name} onChange={handleOnchangeName} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                padding: '2px 6px 6px',
                                borderRadius: '4px'
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ Color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="email">Email</WrapperLabel>
                        <InputForm style={{ with: '300px' }} id="email" value={email} onChange={handleOnchangeEmail} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                padding: '2px 6px 6px',
                                borderRadius: '4px'
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ Color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="phone">Phone</WrapperLabel>
                        <InputForm style={{ with: '300px' }} id="phone" value={phone} onChange={handleOnchangePhone} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                padding: '2px 6px 6px',
                                borderRadius: '4px'
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ Color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="address">Address</WrapperLabel>
                        <InputForm style={{ with: '300px' }} id="address" value={address} onChange={handleOnchangeAddress} />
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                padding: '2px 6px 6px',
                                borderRadius: '4px'
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ Color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>

                    <WrapperInput>
                        <WrapperLabel htmlFor="avatar">Avatar</WrapperLabel>
                        <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1} >
                            <Button icon={<UploadOutlined />}> Select file </Button>
                        </WrapperUploadFile>

                        {avatar && (
                            <img src={avatar} style={{
                                height: '60px',
                                width: '60px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt="avatar" />
                        )

                        }
                        <ButtonComponent
                            onClick={handleUpdate}
                            size={40}
                            styleButton={{
                                height: '30px',
                                width: 'fit-content',
                                padding: '2px 6px 6px',
                                borderRadius: '4px'
                            }}
                            textButton={'Cập nhật'}
                            styleTextButton={{ Color: 'rgb(26, 148, 255)', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperInput>
                </WrapperContentProfile>
            </Loading>
        </div>
    )
}

export default ProfilePage