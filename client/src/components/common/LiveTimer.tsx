import React from 'react'
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import parse from 'date-fns/parse';
import Countdown from 'react-countdown';

export const LiveTimer: React.FC<{ date: string }> = ({ date }) => {
    return (
        // 2021-02-27 19:44:21 +0000 UTC
        <Countdown date={parse(date, 'YYYY-MM-dd HH:mm:ss xxxx', new Date())} />
    )
}
