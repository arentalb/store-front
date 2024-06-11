import {
  useChangePasswordMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../redux/user/userApiSlice.ts";
import { TApiError } from "../../types/TApiError.ts";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../redux/auth/authSlice.ts";
import { Loader } from "../../components/common/Loader.tsx";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  ProfileUpdateForm,
  TProfile,
} from "../../components/profile/ProfileUpdateForm";
import {
  PasswordChangeForm,
  TPassword,
} from "../../components/profile/PasswordChangeForm";
import { SubmitHandler } from "react-hook-form";

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

  useEffect(() => {
    if (profileError) {
      const apiError = profileFetchError as TApiError;
      toast.error(apiError.data.message || "Failed to fetch profile");
    }
  }, [profileError, profileFetchError]);

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
    } catch (error) {
      const apiError = error as TApiError;
      toast.error(apiError.data.message);
    }
  };

  if (profileLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="py-20">
        <h1 className="text-2xl font-bold mb-8">Update Profile</h1>

        <div className="max-w-md flex flex-col gap-4">
          {profileData && (
            <ProfileUpdateForm
              initialValues={profileData.data}
              onSubmit={onUpdateProfile}
              isLoading={updateProfileLoading}
            />
          )}

          <PasswordChangeForm
            onSubmit={onChangePassword}
            isLoading={changePasswordLoading}
          />
        </div>
      </div>
    </div>
  );
}
