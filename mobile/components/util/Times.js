import React from 'react'
import { Text, View } from 'react-native'

const Times = ({ total, style }) => {
    return (
        <View>
            <Text style={{...style}}>
                Thời gian :
                {
                    (parseInt(total / 3600)).toString().length < 2
                        ? '0' + (parseInt(total / 3600))
                        : (parseInt(total / 3600))
                }
                :
                {
                    (parseInt(total / 60)).toString().length < 2
                        ? '0' + (parseInt(total / 60))
                        : (parseInt(total / 60))
                }
                :

                {
                    (total % 60).toString().length < 2
                        ? '0' + (total % 60) + 's'
                        : (total % 60) + 's'
                }
            </Text>
        </View>
    )
}

export default Times
