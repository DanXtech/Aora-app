// import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import React, { useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import FormField from '@/components/FormField'
// import { VideoView } from 'expo-video'
// import { Image } from 'react-native';
// import * as DocumentPicker from "expo-document-picker";
// import { useGlobalContext } from '@/context/GlobalProvider'
// import { router } from 'expo-router'
// import { createVideo } from '@/lib/appwrite'
// import { icons } from '@/constants'
// import CustomButton from '@/components/CustomButton'

// const Create = () => {
//   const { user } = useGlobalContext();
//   const [uploading, setUploading] = useState(false);
//   const [form, setForm] = useState({
//     title: '',
//     video: null,
//     thumbnail: null,
//     prompt: ''
//   });


//   // Open file picker for video or image
//   // const openPicker = async (selectType) => {
//   //   const result = await DocumentPicker.getDocumentAsync({
//   //     type:
//   //       selectType === "image"
//   //         ? ["image/png", "image/jpeg", "image/jpg"]
//   //         : ["video/mp4", "video/mpeg"],
//   //   });

//   //   if (!result.canceled) {
//   //     if (selectType === "image") {
//   //       setForm({ ...form, thumbnail: result.assets[0] });
//   //     } else if (selectType === "video") {
//   //       setForm({ ...form, video: result.assets[0] });
//   //     }
//   //   } else {
//   //     setTimeout(() => {
//   //       Alert.alert("No file selected", "Please choose a file to upload.");
//   //     }, 100);
//   //   }
//   // };
//   const openPicker = async (selectType) => {
//     const result = await DocumentPicker.getDocumentAsync({
//       type:
//         selectType === "image"
//           ? ["image/png", "image/jpg", "image/jpeg"]
//           : ["video/mp4", "video/gif"],
//     });

//     if (!result.canceled) {
//       if (selectType === "image") {
//         setForm({
//           ...form,
//           thumbnail: result.assets[0],
//         });
//       }

//       if (selectType === "video") {
//         setForm({
//           ...form,
//           video: result.assets[0],
//         });
//       }
//     } else {
//       setTimeout(() => {
//         Alert.alert("Document picked", JSON.stringify(result, null, 2));
//       }, 100);
//     }
//   };

//   const submit = async () => {
//     if (!form.title || !form.prompt || !form.thumbnail || !form.video) {
//       return Alert.alert("Please provide all fields")
//     }

//     setUploading(true);
//     try {
//       await createVideo({
//         ...form, userId: user.$id
//       })

//       Alert.alert('Success', 'Post uploaded successfully');
//       router.push('/home')
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     } finally {
//       setForm({
//         title: "",
//         video: null,
//         thumbnail: null,
//         prompt: "",
//       });
//       setUploading(false)
//     }
//   }



//   return (
//     <SafeAreaView className='bg-primary h-full'>
//       <ScrollView className='px-4 my-6'>
//         <Text className='text-2xl text-white font-psemibold'>Upload Video</Text>
//         <FormField
//           title="Video Title"
//           value={form.title}
//           placeholder="Give your video a catch title..."
//           handleChangeText={(e) => setForm({ ...form, title: e })}
//           otherStyles="mt-10"
//         />
//         <View className='mt-7 space-y-2'>
//           <Text className='text-base text-gray-100 font-pmedium'>
//             Upload Video
//           </Text>
//           <TouchableOpacity onPress={() => openPicker("video")}>
//             {form.video ? (

//               <VideoView
//                 style={{
//                   width: "100%",
//                   height: 256,
//                   borderRadius: 16,
//                 }}
//                 source={{ uri: form.video.uri }}
//                 nativeControls
//                 allowsFullscreen
//                 allowsPictureInPicture
//                 // isLooping
//                 shouldPlay
//                 onError={(error) => {
//                   console.log("Video preview error:", error);
//                   Alert.alert("Error", "Failed to load video preview.");
//                 }}
//               />
//             ) : (
//               <View className='w-full h-40 px-4 bg-black-100 rounded-2xl border border-black-200 flex justify-center items-center'>
//                 <View className='w-14 h-14 border border-dashed border-secondary-100 flex justify-center items-center'>
//                   <Image
//                     source={icons.upload}
//                     resizeMode="contain"
//                     alt="upload"
//                     className="w-1/2 h-1/2"
//                   />
//                 </View>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>


//         <View className='mt-7 space-y-2'>
//           <Text className='text-base text-gray-100 font-pmedium'>
//             Thumbnail Image
//           </Text>

//           <TouchableOpacity onPress={() => openPicker("image")}>
//             {form.thumbnail ? (
//               <Image
//                 source={{ uri: form.thumbnail.uri }}
//                 resizeMode="cover"
//                 className="w-full h-64 rounded-2xl"
//               />
//             ) : (
//               <View className="w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 flex justify-center items-center flex-row space-x-2">
//                 <Image
//                   source={icons.upload}
//                   resizeMode="contain"
//                   alt="upload"
//                   className="w-5 h-5"
//                 />
//                 <Text className="text-sm text-gray-100 font-pmedium">
//                   Choose a file
//                 </Text>
//               </View>
//             )}
//           </TouchableOpacity>
//         </View>


//         <FormField
//           title="AI Prompt"
//           value={form.prompt}
//           placeholder="The AI prompt of your video..."
//           handleChangeText={(e) => setForm({ ...form, prompt: e })}
//           otherStyles="mt-7"
//         />

//         <CustomButton
//           title="Submit & Publish"
//           handlePress={submit}
//           containerStyles="mt-7"
//           isLoading={uploading}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   )
// }

// export default Create

// const styles = StyleSheet.create({})




import { Account, Avatars, Client, Databases, ID, Query, Storage } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.aora.app',
    projectId: '67f56326001cf861e9db',
    databaseId: '67f57604001bdebbeeec',
    userCollectionId: '67f576740007185b7c01',
    videoCollectionId: '67f576eb000ad3f9950a',
    storageId: '67f6b5ff003ad18de262',
};


const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoCollectionId,
    storageId,
} = appwriteConfig;


const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

// 🛑 Add throttle logic to limit user creation attempts
let lastCreateCall = 0;
const THROTTLE_DURATION = 5000; // in milliseconds (5 seconds)


// Register user
export const createUser = async (email, password, username) => {
    const now = Date.now();

    if (now - lastCreateCall < THROTTLE_DURATION) {
        throw new Error('You are doing that too often. Please wait a moment and try again.');
    }

    lastCreateCall = now;

    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);

        await signIn(email, password);

        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email: email,
                username: username,
                avatar: avatarUrl,
            }
        );

        return newUser;
    } catch (error) {
        throw new Error(error);
    }
};

// Sign In
export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.error("signIn error:", error);
        throw new Error(error.message || "Failed to sign in.");
    }
};

// Get Current User
export const getCurrentUser = async () => {

    try {
        const currentAccount = await account.get();

        if (!currentAccount) throw Error;


        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Get all video Posts
export const getAllPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}

// Get latest created video posts
export const getLatestPosts = async () => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}

// Get video posts that matches search query
export const searchPosts = async (query) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.search("title", query)]
        );

        if (!posts) throw new Error("Something went wrong");

        return posts.documents;
    } catch (error) {
        throw new Error(error);
    }
}

// Get video posts created by user
export const getUserPosts = async (userId) => {
    try {
        const posts = await databases.listDocuments(
            databaseId,
            videoCollectionId,
            [Query.equal('creator', userId)]
        )

        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
}

// Sign Out
export async function signOut() {
    try {
        const session = await account.deleteSession("current");

        return session;
    } catch (error) {
        // throw new Error(error);
        console.error("signIOut error:", error);
        throw new Error(error.message || "Failed to sign out.");
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl;

    try {
        if (type === 'video') {
            fileUrl = storage.getFileView(storageId, fileId);
        } else if (type === 'image') {
            fileUrl = storage.getFilePreview(storageId, fileId, 2000, 2000, 'top', 100)
        } else {
            throw new Error('Invalid file type')
        }

        if (!fileUrl) throw Error;

        return fileUrl;
    } catch (error) {
        throw new Error(error)
    }
}

//Upload File
export const uploadFile = async (file, type) => {
    if (!file) return;

    const { mimeType, ...rest } = file;
    const asset = { type: mimeType, ...rest };

    console.log('FILE',file);


    try {
        const uploadedFile = await storage.createFile(
            storageId,
            ID.unique(),
            asset
        );


        console.log('uploaded',uploadFile)

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        throw new Error(error)
    }
}

export const createVideo = async (form) => {
    try {
        const [thumbnailUrl, videoUrl] = await Promise.all([
            uploadFile(form.thumbnail, 'image'),
            uploadFile(form.video, 'video'),
        ]);

        const newPost = await databases.createDocument(
            databaseId,
            videoCollectionId,
            ID.unique(),
            {
                title: form.title,
                thumbnail: thumbnailUrl,
                video: videoUrl,
                prompt: form.prompt,
                creator: form.userId
            }
        )

        return newPost;
    } catch (error) {
        throw new Error(error)
    }
}