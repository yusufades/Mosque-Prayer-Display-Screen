export default function Notice({customNotification}: {customNotification?: string}) {
  return (
    <div className="flex text-white text-center md:text-left">
      <div className="mr-4 flex-shrink-0 self-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          className="h-20 w-auto"
				>{customNotification ? (
						<path fill="currentColor"
							// bell icon
									d="M21,19V20H3V19L5,17V11C5,7.9 7.03,5.17 10,4.29C10,4.19 10,4.1 10,4A2,2 0 0,1 12,2A2,2 0 0,1 14,4C14,4.1 14,4.19 14,4.29C16.97,5.17 19,7.9 19,11V17L21,19M14,21A2,2 0 0,1 12,23A2,2 0 0,1 10,21" />)
					: (
						<path
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							// no phone icon
							d="M7.159 3.185C7.415 3.066 7.699 3 8 3h8a2 2 0 0 1 2 2v9m0 4v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V6m5-2h2M3 3l18 18m-9-4v.01"
						/>)}
				</svg>
			</div>
			<div>
				<p className="italic text-xl md:text-2xl md:max-w-lg hidden md:block">
					{customNotification || "Please ensure your mobile phone is silent in the prayer hall."}
				</p>
			</div>
		</div>
	)
}
