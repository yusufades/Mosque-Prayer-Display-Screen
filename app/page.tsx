import Blackout from "@/components/Blackout/Blackout"
import Clock from "@/components/Clock/Clock"
import Date from "@/components/Date/Date"
import MosqueMetadata from "@/components/MosqueMetadata/MosqueMetadata"
import NextPrayerDaysTiles from "@/components/UpcomingPrayerDayTiles/UpcomingPrayerDayTiles"
import Notice from "@/components/Notice/Notice"
import SunriseJummahTiles from "@/components/SunriseJummahTiles/SunriseJummahTiles"
import PrayerTimes from "@/components/PrayerTimes/PrayerTimes"
import ServiceWorker from "@/components/ServiceWorker/ServiceWorker"
import SlidingBanner from "@/components/SlidingBanner/SlidingBanner"
import {
  getJummahTimes,
  getMetaData,
  getPrayerTimesForUpcomingDays,
  getPrayerTimesForToday,
  getPrayerTimesForTomorrow,
} from "@/services/MosqueDataService"
import type {
  DailyPrayerTime,
  UpcomingPrayerTimes,
} from "@/types/DailyPrayerTimeType"
import type { JummahTimes } from "@/types/JummahTimesType"
import type { MosqueMetadataType } from "@/types/MosqueDataType"
import moment from "moment"
import type { Metadata } from "next"
import UpcomingPrayerDayTiles from "@/components/UpcomingPrayerDayTiles/UpcomingPrayerDayTiles"

export async function generateMetadata(): Promise<Metadata> {
  const mosqueMetadata: MosqueMetadataType = await getMetaData()

  return {
    title: `${mosqueMetadata.name} Prayer Times | MosqueScreen Project by MosqueOS`,
    description: `${mosqueMetadata.address} | ${mosqueMetadata.name} | MosqueScreen Project by MosqueOS`,
  }
}

export default async function Home() {
  const today: DailyPrayerTime = await getPrayerTimesForToday()
  const tomorrow: DailyPrayerTime = await getPrayerTimesForTomorrow()
  const jummahTimes: JummahTimes = await getJummahTimes()
  const mosqueMetadata: MosqueMetadataType = await getMetaData()
  const upcomingPrayerDays: UpcomingPrayerTimes[] =
    await getPrayerTimesForUpcomingDays()

  const isHanbaliJummah = moment(jummahTimes[0].time, "HH:mm").isBefore(moment(today.zuhr.start, "HH:mm"))
  let slides = [
    <SunriseJummahTiles
      sunrise={today.sunrise_start}
      jummahTimes={jummahTimes}
      key={"sunrise_jummah_times"}
      isHanbaliJummah={isHanbaliJummah}
    />,
  ]

  upcomingPrayerDays.forEach((times) => {
    slides.push(<UpcomingPrayerDayTiles times={times} />)
  })

  return (
    <>
      <main className="md:p-5">
        <div className="md:grid md:grid-cols-8">
          <div className="md:col-span-3">
            <div className="p-4 md:p-6">
              <Clock />
            </div>
            <div className="p-4 md:p-6">
							<Date
								hijri_offset={isNaN(Number(mosqueMetadata['hijri_offset'])) ? 0 : Number(mosqueMetadata['hijri_offset'])} />
            </div>
            <div className="p-4 md:p-6">
              <MosqueMetadata metadata={mosqueMetadata} />
            </div>
            <div className="hidden md:p-6 md:block">
              <Notice customNotification={mosqueMetadata['custom_reminder']} />
            </div>
          </div>
          <div className="p-4 md:p-6 md:col-span-5">
            <PrayerTimes today={today} tomorrow={tomorrow} />
          </div>
        </div>
        <div className="p-4 md:p-6">
          <SlidingBanner slides={slides} />
        </div>
        <ServiceWorker />
      </main>
      <Blackout prayerTimeToday={today} />
    </>
  )
}
