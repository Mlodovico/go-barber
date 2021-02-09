import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 50px 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px;
`;

export const BackToPageButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  border-top-width: 1.5px;
  border-color: #232129;

  flex-direction: row;
`;

export const BackToPageText = styled.Text`
  color: #f4ede8;
  font-size: 15px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 5px;

`;
