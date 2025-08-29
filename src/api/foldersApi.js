import api from "./api" // seu axios configurado

export const fetchFolders = (token) =>
  	api.get("/folders/list", { headers: { token: `Bearer ${token}` } })

export const createFolder = (folderName, token) =>
  	api.post("/folders/new", { folderName }, { headers: { token: `Bearer ${token}` } })

export const renameFolder = (folderName, newFolderName, token) =>
  	api.patch("/folders/name", { folderName, newFolderName }, { headers: { token: `Bearer ${token}` } })

export const deleteFolder = (folderName, token) =>
	api.delete("/folders/rem", {
		headers: { token: `Bearer ${token}` },
		data: { folderName },
	})

export const deleteVideo = (folderName, videoId, token) =>
	api.delete("/folders/video", {
		headers: { token: `Bearer ${token}` },
		data: { folderName, videoId },
	})

export const renameVideoTag = (folderName, videoId, videoTag, token) =>
  	api.patch("/folders/video/tag", { folderName, videoId, videoTag }, { headers: { token: `Bearer ${token}` } })

export const addVideoToFolder = (folderName, videoId, token) =>
	api.post(
		"/folders/video",
		{ folderName, videoId },
		{ headers: { token: `Bearer ${token}` } }
	)

export const patchFolderDays = (folderName, daysOfWeek, token) =>
	api.patch("/folders/days", { folderName, daysOfWeek }, { headers: { token: `Bearer ${token}` } })