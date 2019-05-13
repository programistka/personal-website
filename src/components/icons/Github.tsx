import React from 'react';
import { colors } from '../../styles/common';

type GithubProps = {
    iconFill?: string;
};

const Github = ({ iconFill = colors.textTitleLight }: GithubProps) => {
    return (
        <svg width="40" height="41" viewBox="0 0 40 41" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M35.7143 0.857147H4.28571C1.91964 0.857147 0 2.77679 0 5.14286V36.5714C0 38.9375 1.91964 40.8571 4.28571 40.8571H35.7143C38.0804 40.8571 40 38.9375 40 36.5714V5.14286C40 2.77679 38.0804 0.857147 35.7143 0.857147ZM24.7589 35.1161C24.0089 35.25 23.7321 34.7857 23.7321 34.4018C23.7321 33.9196 23.75 31.4554 23.75 29.4643C23.75 28.0714 23.2857 27.1875 22.7411 26.7232C26.0446 26.3571 29.5268 25.9018 29.5268 20.1964C29.5268 18.5714 28.9464 17.7589 28 16.7143C28.1518 16.3304 28.6607 14.75 27.8482 12.6964C26.6071 12.3125 23.7679 14.2946 23.7679 14.2946C22.5893 13.9643 21.3125 13.7946 20.0536 13.7946C18.7946 13.7946 17.5179 13.9643 16.3393 14.2946C16.3393 14.2946 13.5 12.3125 12.2589 12.6964C11.4464 14.7411 11.9464 16.3214 12.1071 16.7143C11.1607 17.7589 10.7143 18.5714 10.7143 20.1964C10.7143 25.875 14.0446 26.3571 17.3482 26.7232C16.9196 27.1071 16.5357 27.7679 16.4018 28.7143C15.5536 29.0982 13.3839 29.7589 12.0893 27.4732C11.2768 26.0625 9.8125 25.9464 9.8125 25.9464C8.36607 25.9286 9.71429 26.8571 9.71429 26.8571C10.6786 27.3036 11.3571 29.0179 11.3571 29.0179C12.2232 31.6696 16.3661 30.7768 16.3661 30.7768C16.3661 32.0179 16.3839 34.0357 16.3839 34.4018C16.3839 34.7857 16.1161 35.25 15.3571 35.1161C9.46429 33.1429 5.33929 27.5357 5.33929 20.9821C5.33929 12.7857 11.6071 6.5625 19.8036 6.5625C28 6.5625 34.6429 12.7857 34.6429 20.9821C34.6518 27.5357 30.6518 33.1518 24.7589 35.1161ZM16 29.6607C15.8304 29.6964 15.6696 29.625 15.6518 29.5089C15.6339 29.375 15.75 29.2589 15.9196 29.2232C16.0893 29.2054 16.25 29.2768 16.2679 29.3929C16.2946 29.5089 16.1786 29.625 16 29.6607ZM15.1518 29.5804C15.1518 29.6964 15.0179 29.7946 14.8393 29.7946C14.6429 29.8125 14.5089 29.7143 14.5089 29.5804C14.5089 29.4643 14.6429 29.3661 14.8214 29.3661C14.9911 29.3482 15.1518 29.4464 15.1518 29.5804ZM13.9286 29.4821C13.8929 29.5982 13.7143 29.6518 13.5625 29.5982C13.3929 29.5625 13.2768 29.4286 13.3125 29.3125C13.3482 29.1964 13.5268 29.1429 13.6786 29.1786C13.8571 29.2321 13.9732 29.3661 13.9286 29.4821ZM12.8304 29C12.75 29.0982 12.5804 29.0804 12.4464 28.9464C12.3125 28.8304 12.2768 28.6607 12.3661 28.5804C12.4464 28.4821 12.6161 28.5 12.75 28.6339C12.8661 28.75 12.9107 28.9286 12.8304 29ZM12.0179 28.1875C11.9375 28.2411 11.7857 28.1875 11.6875 28.0536C11.5893 27.9196 11.5893 27.7679 11.6875 27.7054C11.7857 27.625 11.9375 27.6875 12.0179 27.8214C12.1161 27.9554 12.1161 28.1161 12.0179 28.1875ZM11.4375 27.3214C11.3571 27.4018 11.2232 27.3571 11.125 27.2679C11.0268 27.1518 11.0089 27.0179 11.0893 26.9554C11.1696 26.875 11.3036 26.9196 11.4018 27.0089C11.5 27.125 11.5179 27.2589 11.4375 27.3214ZM10.8393 26.6607C10.8036 26.7411 10.6875 26.7589 10.5893 26.6964C10.4732 26.6429 10.4196 26.5446 10.4554 26.4643C10.4911 26.4107 10.5893 26.3839 10.7054 26.4286C10.8214 26.4911 10.875 26.5893 10.8393 26.6607Z"
                fill={iconFill}
            />
        </svg>
    );
};

export default Github;
