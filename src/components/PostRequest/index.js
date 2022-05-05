import React, {useState, useEffect} from 'react';
import Title from "../UI/Title";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import {schema} from "./validation";
import api from "../../services/api";
import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    styled,
    TextField,
} from "@mui/material";
import UploadFile from "../UI/UploadFile";
import Button from "../UI/Button";
import Loader from "../UI/Loader";
import useUsers from "../../hooks/useUsers";
import "./PostRequest.scss";

const PostRequest = () => {
        const [isLoading, setIsLoading] = React.useState(false);
        const [positions, setPositions] = React.useState(null);
        const [radio, setRadio] = useState(1);
        const auth = useUsers();
        const [severError, setSeverError] = React.useState(null);

        const {
            control,
            formState: {errors},
            handleSubmit,
            setValue,
        } = useForm({
            resolver: yupResolver(schema)
        });

        const CssTextField = styled(TextField)({
            margin: '25px 0',
            '.MuiInputLabel-root': {
                color: '#7E7E7E',
                fontFamily: 'Nunito',
                fontSize: '16px',

            },
            '& .MuiOutlinedInput-root': {
                lineHeight: '54px',
                fontFamily: 'Nunito',
                fontSize: '16px',
                color: '#7E7E7E',
                '.MuiOutlinedInput-input': {
                    height: '54px',
                    lineHeight: '54px',
                    padding: '0 16px',
                },
                '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#D0CFCF',
                    'legend': {
                        fontSize: '12px',
                    },
                },
            },
            '.MuiFormHelperText-root': {
                position: 'absolute',
                left: '0',
                top: '55px',
                fontFamily: 'Nunito',
                fontSize: '12px',
            },
        });

        const CssFormControl = styled(FormControl)({
            margin: '18px 0 47px',
        });

        const CssFormLabel = styled(FormLabel)({
            color: 'rgba(0, 0, 0, 0.87)',
            fontFamily: 'Nunito',
            fontSize: '16px',
            textAlign: 'left',
            '&.Mui-focused': {
                color: 'rgba(0, 0, 0, 0.87)',
            }
        });

        const CssFormControlLabel = styled(FormControlLabel)({
            '.MuiFormControlLabel-label': {
                color: 'rgba(0, 0, 0, 0.87)',
                fontFamily: 'Nunito',
                fontSize: '16px',
            }
        });

        const CssRadio = styled(Radio)({
            padding: '6px 9px',
            color: '#D0CFCF',
            '&.Mui-checked': {
                color: '#00BDD3',
            },
        });

        const onSubmit = async (data) => {
            try {
                setIsLoading(true);
                const {data: {token}} = await api.auth.getToken();
                const formData = new FormData();
                for (const key in data) {
                    formData.append(key, data[key])
                }
                const {data: {success}} = await api.auth.registrationUser(formData, token);
                auth.setUserRegistered(success);

                auth.loadData();
                auth.setPage(1);
            } catch (e) {
                if (e.response.status === 409) {
                    setSeverError(e.response.data.message);
                } else {
                    console.error(e);
                }
            } finally {
                setIsLoading(false);
            }
        }

        const onChangeRadio = (e) => {
            setValue('position_id', e.target.value);
            setRadio(e.target.value);
        }

        async function loadPositions() {
            try {
                setIsLoading(true);
                const {data} = await api.auth.getPositions();
                setPositions(data.positions);
                setIsLoading(false);
            } catch (e) {
                console.error(e);
            }
        }

        const onChangePhoto = (files) => {
            setValue('photo', files);
        }

        const onDeletePhoto = (files) => {
            setValue('photo', '');
        }

        useEffect(() => {
            loadPositions();
        }, []);

        return (
            <section className="post-request" id="postRequest">
                <div className="container">
                    <Title className="title">Working with POST request</Title>
                    <form onSubmit={handleSubmit(onSubmit)} className="post-request-form">
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <CssTextField
                                    {...field}
                                    error={Boolean(errors.name?.message)}
                                    fullWidth={true}
                                    type="text"
                                    label="Your name"
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <CssTextField
                                    {...field}
                                    error={Boolean(errors.email?.message)}
                                    fullWidth={true}
                                    type="email"
                                    label="Email"
                                    helperText={errors.email?.message}
                                />
                            )}
                        />
                        <Controller
                            name="phone"
                            control={control}
                            defaultValue=""
                            render={({field}) => (
                                <CssTextField
                                    {...field}
                                    error={Boolean(errors.phone?.message)}
                                    fullWidth={true}
                                    type="text"
                                    label="Phone"
                                    helperText={errors.phone?.message ? errors.phone?.message : '+38 (XXX) XXX - XX - XX'}
                                />
                            )}
                        />
                        <CssFormControl fullWidth={true}>
                            <CssFormLabel>Select your position</CssFormLabel>
                            {
                                positions
                                    ? <Controller
                                        name="position_id"
                                        control={control}
                                        defaultValue={positions[0].id}
                                        helperText={errors.position_id?.message}
                                        render={({field}) => (
                                            <RadioGroup aria-label="gender">
                                                {
                                                    positions.map(position => (
                                                        <CssFormControlLabel
                                                            key={position.id}
                                                            value={position.id}
                                                            control={<CssRadio/>}
                                                            label={position.name}
                                                            onChange={(e) => {
                                                                onChangeRadio(e);
                                                            }}
                                                            checked={radio == position.id}

                                                        />
                                                    ))
                                                }
                                            </RadioGroup>
                                        )}
                                    />
                                    : <Loader/>
                            }
                        </CssFormControl>
                        <Controller
                            name="photo"
                            control={control}
                            render={(props) => (
                                <UploadFile
                                    error={errors.photo?.message}
                                    onChangePhoto={onChangePhoto}
                                    onDeletePhoto={onDeletePhoto}
                                />
                            )}
                        />
                        <Button
                            className="btn btn__small"
                            disabled={isLoading}
                        >
                            Sign up
                        </Button>
                        {severError && <p className="post-request-form__error">{severError}</p>}
                    </form>
                </div>
            </section>
        );
    }
;

export default PostRequest;