import axios from 'axios';

export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const API_PATHS = {
    AUTH:{
        SIGNUP:'/api/auth/signup',
        LOGIN:'/api/auth/login',
        VERIFY_EMAIL:'/api/auth/verify-email',
        RESEND_VERIFICATION_EMAIL:'/api/auth/resend-verification',
        FORGOT_PASSWORD:'/api/auth/forgot-password',
        RESET_PASSWORD:(token)=>`/api/auth/reset-password/${token}`,
        CHECK_AUTH:'/api/auth/check-auth'
    },
    RESUME:{
        CREATE_RESUME:'/api/resume',
        GET_RESUME:'/api/resume',
        GET_BY_ID:(resumeId)=>`/api/resume/${resumeId}`,
        UPDATE_RESUME:(resumeId)=>`/api/resume/${resumeId}`,
        DELETE_RESUME:(resumeId)=>`/api/resume/${resumeId}`,
        UPLOAD_IMAGES:(resumeId)=>`/api/resume/${resumeId}/upload-images`
    },
    image:{
        UPLOAD_IMAGES:`api/auth/upload-image`
    }
}