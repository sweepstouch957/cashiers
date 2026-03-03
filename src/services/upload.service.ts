import apiClient from "@/lib/axios";

export interface UploadResponse {
  url: string;
  public_id: string;
}

const uploadImage = async (image: File, folder: string): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('folder', folder);

  const response = await apiClient.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const uploadCampaignImage = (image: File): Promise<UploadResponse> =>
  uploadImage(image, 'campaigns');

export const uploadProfileImage = (image: File): Promise<UploadResponse> =>
  uploadImage(image, 'profile');

