import React from 'react'
import Image from 'next/image'
import OutlineText from '@/components/ui/outline-text'

export const Streak = ({ streak }:
    { streak: number }
) => {
    return (
        <>
            <span className="flex gap-1 items-center">
                {streak === 0 ? (
                    <Image
                        src="/assets/streak/0.png"
                        alt="streak neutral"
                        width={18}
                        height={17}
                        className="inline-block mb-0.5"
                    />
                ) : streak < 20 ? (
                    <Image
                        src="/assets/streak/1.png"
                        alt="streak neutral"
                        width={18}
                        height={17}
                        className="inline-block mb-0.5"
                    />
                ) : streak < 50 ? (
                    <Image
                        src="/assets/streak/2.png"
                        alt="streak neutral"
                        width={17}
                        height={20}
                        className="inline-block mb-0.5"
                    />
                ) : (
                    <Image
                        src="/assets/streak/3.png"
                        alt="streak neutral"
                        width={17}
                        height={20}
                        className="inline-block mb-0.5"
                    />
                )}

                <OutlineText text={`${streak}`} color={
                    streak === 0
                        ? "gray"
                        : streak < 20
                            ? "yellow"
                            : streak < 50
                                ? "orange"
                                : "red"
                } size="md" /></span></>
    )
}
