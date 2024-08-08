// import React, { useState, useEffect } from 'react';
// import { View, TextInput, Text } from 'react-native';

// const DynamicInput = ({ iconName, placeholder }) => {
//   const [IconComponent, setIconComponent] = useState(null);

//   useEffect(() => {
//     // Import the icon component statically based on the iconName prop
//     const importIconComponent = async () => {
//       try {
//         const iconModule = await import(`react-native-heroicons/solid/${iconName}`);
//         setIconComponent(iconModule.default);
//       } catch (error) {
//         console.error('Error importing icon component:', error);
//       }
//     }; 

//     importIconComponent();

//   }, [iconName]);

//   return (
//     <View>
//       <Text className='font-semibold mt-2'>NAME:</Text>
//       <View className='w-[100%] bg-blue-400 border flex-row flex-wrap p-1 mt-2 mb-5 rounded-lg' style={{ elevation: 10 }}>
//         <View className='bg-[#E2AD36] p-1 mr-2 rounded-lg' style={{ elevation: 5 }}>
//           {IconComponent && <IconComponent color="white" size={30} />} {/* Render icon if IconComponent is available */}
//         </View>
//         <TextInput placeholder={placeholder} className="w-[85%] bg-blue-100 rounded-md pl-1" style={{ elevation: 5 }} />
//       </View>
//     </View>
//   );
// };

// export default DynamicInput;
