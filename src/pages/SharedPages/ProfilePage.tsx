import {
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/user/userApiSlice.ts";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { TApiError } from "../../types/TApiError.ts";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/auth/authSlice.ts";
import { Loader } from "../../components/common/Loader.tsx";

export interface TProfile {
  username: string;
  email: string;
}

export interface TPassword {
  oldPassword: string;
  newPassword: string;
}

export function ProfilePage() {
  const dispatch = useDispatch();
  const {
    data: profileData,
    isLoading: profileLoading,
    isError: profileError,
    error: profileFetchError,
  } = useGetProfileQuery();

  const [updateProfile, { isLoading: updateProfileLoading }] =
    useUpdateProfileMutation();
  const [changePassword, { isLoading: changePasswordLoading }] =
    useChangePasswordMutation();

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
    setValue: setValueProfile,
  } = useForm<TProfile>();

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm<TPassword>();

  useEffect(() => {
    if (profileData && profileData.data) {
      setValueProfile("username", profileData.data.username);
      setValueProfile("email", profileData.data.email);
    }
  }, [setValueProfile, profileData]);

  const onUpdateProfile: SubmitHandler<TProfile> = async (newUser) => {
    try {
      const newProfile = await updateProfile(newUser).unwrap();
      toast.success("User updated");
      dispatch(setCredentials(newProfile.data));
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(apiError.data.message);
    }
  };

  const onChangePassword: SubmitHandler<TPassword> = async (passwords) => {
    try {
      await changePassword(passwords).unwrap();
      toast.success("Password changed");
      resetPassword();
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(apiError.data.message);
    }
  };

  if (profileLoading) {
    return <Loader />;
  }

  if (profileError) {
    const apiError = profileFetchError as TApiError;
    toast.error(apiError.data.message || "Failed to fetch profile");
    return <div>Error loading profile</div>;
  }

  return (
    <div>
      <div className="py-20">
        <h1 className="text-2xl font-bold mb-8">Update Profile</h1>

        <div className="max-w-md flex flex-col gap-4">
          <form
            onSubmit={handleSubmitProfile(onUpdateProfile)}
            className={"flex flex-col gap-4"}
          >
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  {...registerProfile("email", { required: true })}
                />
              </label>
              {errorsProfile.email && (
                <span className="text-error text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className="grow"
                  placeholder="Username"
                  {...registerProfile("username", { required: true })}
                />
              </label>
              {errorsProfile.username && (
                <span className="text-error text-sm">
                  This field is required
                </span>
              )}
            </div>
            <button
              className="btn btn-neutral"
              disabled={updateProfileLoading}
              type="submit"
            >
              {updateProfileLoading ? <Loader /> : "Update"}
            </button>
          </form>

          <form
            onSubmit={handleSubmitPassword(onChangePassword)}
            className={"flex flex-col gap-4"}
          >
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="Old Password"
                  {...registerPassword("oldPassword", { required: true })}
                />
              </label>
              {errorsPassword.oldPassword && (
                <span className="text-error text-sm">
                  This field is required
                </span>
              )}
            </div>
            <div>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="New Password"
                  {...registerPassword("newPassword", { required: true })}
                />
              </label>
              {errorsPassword.newPassword && (
                <span className="text-error text-sm">
                  This field is required
                </span>
              )}
            </div>
            <button
              className="btn btn-neutral "
              disabled={changePasswordLoading}
              type="submit"
            >
              {changePasswordLoading ? <Loader /> : "Change Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
