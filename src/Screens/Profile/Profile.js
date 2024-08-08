import React from 'react';
import { Button ,View, Text,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; 
import { useAuth } from '../../Firebase/AuthContextProvider';
import {PaperAirplaneIcon,EyeIcon,LockClosedIcon,ChevronRightIcon,ArrowRightOnRectangleIcon,UserIcon} from 'react-native-heroicons/outline'


const Profile = () => {
    const navigation = useNavigation(); 
    const { logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            // Navigate to the login page after successful logout
            navigation.navigate('Login');
        } catch (error) {
            console.error('Logout error:', error.message);
        }
    };

    return (
        <View className=''>
        <View className='bg-[#0e93ff] h-52 ' style={{elevation:10}}>
             <Text className='text-white text-4xl mt-10 mx-4 font-bold'>Settings</Text>
             <Text className='text-white text-lg mx-4'>Manage Your Account</Text>
        </View>
        <View>

        </View>
        <View className='bg-white h-fit mx-3 rounded-2xl my-[-50px] p-4 justify-around mb-5' style={{elevation:10}}>
        <TouchableOpacity><View className='flex-row items-center p-2 justify-between my-2'><View className='flex-row items-center'><View className='bg-[#f6f6f6] p-1 rounded-full'><UserIcon color="#0e93ff" size={35}/></View><Text className='font-bold text-xl ml-4 text-gray-600'>Profile</Text></View><ChevronRightIcon color='gray' size={30}/></View></TouchableOpacity>
        <TouchableOpacity><View className='flex-row items-center p-2 justify-between my-2'><View className='flex-row items-center'><View className='bg-[#f6f6f6] p-1 rounded-full'><LockClosedIcon color="#0e93ff" size={35}/></View><Text className='font-bold text-xl ml-4 text-gray-600'>Security</Text></View><ChevronRightIcon color='gray' size={30}/></View></TouchableOpacity>
        <TouchableOpacity><View className='flex-row items-center p-2 justify-between my-2'><View className='flex-row items-center'><View className='bg-[#f6f6f6] p-1 rounded-full'><EyeIcon color="#0e93ff" size={35}/></View><Text className='font-bold text-xl ml-4 text-gray-600'>Privacy</Text></View><ChevronRightIcon color='gray' size={30}/></View></TouchableOpacity>
        <TouchableOpacity><View className='flex-row items-center p-2 justify-between my-2'><View className='flex-row items-center'><View className='bg-[#f6f6f6] p-1 rounded-full'><PaperAirplaneIcon color="#0e93ff" size={30}/></View><Text className='font-bold text-xl ml-4 text-gray-600'>Send Feedback</Text></View><ChevronRightIcon color='gray' size={30}/></View></TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogout}><View className='mt-3 bg-white h-fit m-3 rounded-2xl py-3 px-8 flex-row items-center' style={{elevation:10}} ><ArrowRightOnRectangleIcon size={40} color='red'/><Text className='text-red ml-3 text-lg font-semibold text-red-500'>Logout</Text></View></TouchableOpacity>
   </View>
    );
};

export default Profile;
