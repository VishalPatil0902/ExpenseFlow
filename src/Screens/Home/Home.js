import { View, Text ,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import Carousel from '../../Components/Carousel'
import {DocumentTextIcon,ClipboardDocumentCheckIcon} from 'react-native-heroicons/solid'


//IMAGES 

import Caseimg from '../../../assets/image1.jpg';
import Chatimg from '../../../assets/image2.jpg';
import rehabimg from '../../../assets/image3.jpg';
import legalimg from '../../../assets/image4.jpg';
import avatar from '../../../assets/Lawyer3.jpg'

const Home = ({navigation}) => {
  return (
    <View className='bg-[#EAECF9] w-full h-full'>

    <View className='m-2 bg-[#EAECF9]'>
            <View className="flex-row justify-between mt-2 items-center ">
                  <View className='rounded-lg'>
                   <Text className='font-bold text-2xl text-yellow-500 text-center w-full ml-14'>Expense Flow</Text>
                  </View>
                  <View className='rounded-lg p-1'>
                  <TouchableOpacity onPress={()=>navigation.navigate("Notification")}><Image source={avatar} className='w-8 h-8 mr-2 rounded-full'/></TouchableOpacity>
                  </View>
            </View>

            
      <View className='mt-5'>
            <Carousel/>
      </View>
            

         {/* CARDS */}
      <Text className='font-semibold mt-2 ml-5 text-xl'>Welcome to , Expense Flow</Text>
      <View className="flex-row justify-around flex-wrap w-[100%] h-32 rounded-t-3xl ">
                  <View className='rounded-lg mt-5 w-[45%] h-[100%] '>
                        <TouchableOpacity className="text-[#f5ddd7] rounded-md  bg-white justify-center p-1" style={{elevation:10,shadowColor:'blue'}} onPress={() => navigation.navigate("LawyerPageNavigation")}>
                              <View className='w-[80%] h-[80%] p-3 flex items-end justify-center'>
                                   <ClipboardDocumentCheckIcon color="#ff7754" size={60} />
                              </View>
                              <Text className='text-center text-md m-1 font-bold w-max  text-gray-500'>Articles</Text>
                        </TouchableOpacity>
                  </View>

                  <View className='rounded-lg mt-5 w-[45%] h-[100%] '>
                        <TouchableOpacity className="text-[#f5ddd7] rounded-md  bg-white justify-center p-1" style={{elevation:10,shadowColor:'blue'}} onPress={() => navigation.navigate("Rehabilitation")}>
                              <View className='w-[80%] h-[80%] p-3 flex items-end justify-center'>
                                   <DocumentTextIcon color="#ff7754" size={60} />
                              </View>
                              <Text className='text-center text-md m-1 font-bold w-max  text-gray-500'>Company Policy</Text>
                        </TouchableOpacity>
                  </View>
      </View> 
      <Text className='text-xl mt-10 ml-5 font-bold w-max'>Recent Request</Text>
      <View className='flex justify-center items-center'>
      <View className='rounded-lg mt-5 w-[95%] h-48 '>
                        <TouchableOpacity className="text-[#f5ddd7] rounded-md  bg-white justify-center p-1" style={{elevation:10,shadowColor:'blue'}} onPress={() => navigation.navigate("Rehabilitation")}>
                              <View className='p-2'>
                                    <View className='flex  text-gray-400 w-full  '>
                                         <View className='p-2 bg-green-400 rounded-t-xl mb-5'></View>
                                         <View className='flex-row m-0.5'><Text className='font-bold'>NAME </Text><Text>: HOTEL SAGAR VEG</Text></View> 
                                         <View className='flex-row m-0.5'><Text className='font-bold'>DATE </Text><Text>: 08-12-24</Text></View> 
                                         <View className='flex-row m-0.5'><Text className='font-bold'>AMOUNT </Text><Text>: 2121.00</Text></View> 
                                         <View className='flex-row m-1=0.5'><Text className='font-bold'>GSTIN </Text><Text>: 27AAHCA4887F2ZD</Text></View> 
                                         <Text></Text>
                               </View>
                              </View>
                        </TouchableOpacity>
      </View>
      </View>

    </View>
</View>

  )
}

export default Home