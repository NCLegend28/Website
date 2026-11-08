/**
 * PicPlace copy: product page details, privacy policy, and support FAQ.
 *
 * Every claim here was checked against the PicPlace Swift source and
 * PhotoCleanup/PrivacyInfo.xcprivacy on 2026-11-07 (see docs/apps-launch-handoff.md).
 * If the app changes (new network calls, analytics, data types), update this file
 * and the App Store privacy label together.
 *
 * Inline formatting: [label](href) for links, **text** for emphasis. Nothing else.
 */
import { SITE } from '../../config/site.js'

const contact = SITE.publisher.email

export const privacy = {
  // Owner-editable. Change this date whenever the policy text changes.
  effectiveDate: '2026-11-07',
  intro: [
    `This policy explains how the PicPlace app for iPhone handles information. PicPlace is published by ${SITE.publisher.name}. Questions go to [${contact}](mailto:${contact}).`,
  ],
  sections: [
    {
      id: 'summary',
      heading: 'Summary',
      blocks: [
        { ul: [
          'PicPlace works on your device with the Photos library you give it access to.',
          'PicPlace does not collect, sell, or share your personal data, and does not track you across apps or websites.',
          'PicPlace contains no advertising, analytics, or third-party SDKs, and the publisher runs no server for the app.',
          'Nothing is deleted until you confirm in Apple’s Photos prompt, and deleted items go to Recently Deleted in Apple Photos.',
        ] },
      ],
    },
    {
      id: 'photos-access',
      heading: 'Photos access you grant',
      blocks: [
        { p: 'When you tap **Allow photo access**, iOS asks whether PicPlace may use your Photos library. You choose Full Access, Limited Access (only the items you pick), or no access. With Limited Access you can review the items you shared. Creating albums and adding items to albums needs Full Access.' },
        { p: 'With access, PicPlace reads:' },
        { ul: [
          'the photos and videos themselves, to show previews and play videos;',
          'details Photos provides about each item, such as creation date, media type, whether it is a screenshot or a favorite, video length, and whether its original is stored on this device or in iCloud;',
          'your editable albums, so you can file items into them and pin favorites.',
        ] },
        { p: 'PicPlace uses this to show items for review, filter screenshots by age (favorites are left out unless you include them), list long videos first, group items by storage location, file items into albums, and move items you confirm to Recently Deleted. This happens on your device. PicPlace does not upload your photos, videos, or library details to the publisher or anyone else.' },
      ],
    },
    {
      id: 'on-device',
      heading: 'Information saved on your device',
      blocks: [
        { p: 'To remember your progress, PicPlace saves the following in its own storage on your device:' },
        { ul: [
          'review decisions (keep or marked for deletion), linked to the identifiers Photos assigns to items;',
          'the identifiers of up to three pinned albums;',
          'preferences: screenshot age filter, whether to include favorite screenshots, batch sizes for size checks, and whether you have completed the welcome tour.',
        ] },
        { p: 'This information is not sent to the publisher. iOS may include it in your device backups, depending on your backup settings. **Reset review progress** in PicPlace clears keep and delete marks without changing Photos. Deleting the app removes this information from the device.' },
      ],
    },
    {
      id: 'icloud',
      heading: 'iCloud Photos',
      blocks: [
        { p: 'If you use iCloud Photos, some originals may be stored only in iCloud. PicPlace’s storage review uses what Photos already has on the device and does not download originals.' },
        { p: 'Some actions ask Apple Photos to fetch media from iCloud: choosing **Load from iCloud** or **Download to check size**, and opening some previews or playing videos whose originals are in iCloud. Apple Photos performs these downloads between your device and Apple’s servers under [Apple’s Privacy Policy](https://www.apple.com/legal/privacy/). PicPlace never receives your Apple Account credentials.' },
      ],
    },
    {
      id: 'changes-to-library',
      heading: 'Album changes and deletion',
      blocks: [
        { p: 'With Full Access, PicPlace creates albums and adds items to albums only when you choose to. Adding an item to an album keeps it in your library, and an item can be in several albums. PicPlace does not remove items from albums.' },
        { p: 'Items you mark for deletion wait in the cleanup queue. Nothing is deleted until you review the batch and confirm in the Photos prompt. Confirmed items move to **Recently Deleted** in Apple Photos, where Photos normally keeps them for 30 days so you can recover them or delete them permanently. If you use iCloud Photos, deletions apply to your other devices using the same library, and Photos can delete items immediately if your iCloud storage is full.' },
      ],
    },
    {
      id: 'permissions',
      heading: 'Changing or removing access',
      blocks: [
        { p: 'Open the **Settings** app, go to **Apps → PicPlace → Photos**, and choose Full Access, Limited Access, or None. With Limited Access, **Manage photo access** in PicPlace opens the same screen. Removing access stops PicPlace from reading your library. Progress saved on the device stays until you reset it or delete the app.' },
      ],
    },
    {
      id: 'apple-data',
      heading: 'Information Apple may share',
      blocks: [
        { p: 'If you choose to share analytics with app developers in your device settings, Apple may give the publisher aggregated usage and crash information under Apple’s terms. PicPlace does not add its own analytics.' },
      ],
    },
    {
      id: 'website-and-email',
      heading: 'This website and support email',
      blocks: [
        { p: `This policy covers the PicPlace app. The website that hosts it, ${SITE.url.replace(/^https?:\/\//, '')}, is separate:` },
        { ul: [
          `The site’s optional AI chat sends the questions you type to ${SITE.chatProvider}, an external AI provider, to generate replies. The site does not save chat transcripts. The guide’s quick topics run in your browser and send nothing.`,
          'Like most websites, the hosting server may keep standard request logs, such as IP address and pages requested.',
          'If you email support, the publisher receives your email address and whatever you include, and uses it only to respond to you. You can ask for that correspondence to be deleted.',
        ] },
      ],
    },
    {
      id: 'changes',
      heading: 'Changes to this policy',
      blocks: [
        { p: 'If this policy changes, the new version will be posted on this page with a new effective date.' },
      ],
    },
  ],
}

export const support = {
  intro: 'Email is the fastest way to get help. Include your device model, iOS version, and what you were trying to do. Please don’t attach private photos unless they’re needed to show the problem.',
  emailSubject: 'PicPlace support',
  faq: [
    {
      id: 'photos-permissions',
      q: 'How do I give PicPlace access to my photos, or change it?',
      a: [
        { p: 'Tap **Allow photo access** in PicPlace and choose Full Access or Limited Access. To change it later, open **Settings → Apps → PicPlace → Photos**. With Limited Access, PicPlace shows only the items you shared, and **Manage photo access** in the app opens that screen. Album features need Full Access.' },
      ],
    },
    {
      id: 'icloud-originals',
      q: 'Why do some items say “In iCloud”?',
      a: [
        { p: 'With iCloud Photos and Optimize iPhone Storage, some originals live only in iCloud. **Review by storage** groups items as On this device, In iCloud, or Storage unknown when Photos can tell, without downloading anything. To see a size or preview for an iCloud item, choose **Download to check size** or **Load from iCloud**, which uses your connection. Sizes are estimates, and deleting may not free that much space.' },
      ],
    },
    {
      id: 'albums',
      q: 'How do I file photos into albums?',
      a: [
        { p: 'With Full Access, tap **Add to album** while reviewing to pick an album or create one. Pin up to three albums with **Manage pinned albums** to file with one tap. **Organize your library** lets you select a batch and file it together. Items stay in your library and can be in more than one album.' },
      ],
    },
    {
      id: 'recently-deleted',
      q: 'How do I recover something I deleted?',
      a: [
        { p: 'PicPlace moves items you confirm to Recently Deleted in Apple Photos, where they normally stay for 30 days.' },
        { ol: [
          'Open the Photos app and go to **Collections**.',
          'Under **Utilities**, open **Recently Deleted** and unlock it.',
          'Tap **Select**, choose the items, then choose **Recover**. Choose **Delete** instead to remove them permanently.',
        ] },
        { p: 'If iCloud Photos needed to delete items right away because storage was full, they may not appear there.' },
      ],
    },
    {
      id: 'upload',
      q: 'Does PicPlace upload my photos?',
      a: [
        { p: 'No. PicPlace works on your device and does not send your photos or library details to the publisher. Apple Photos may download originals from iCloud when you ask for them. See the [privacy policy](/apps/picplace/privacy).' },
      ],
    },
    {
      id: 'reset',
      q: 'How do I start my review over?',
      a: [
        { p: 'Use **Reset review progress** in PicPlace. It clears keep and delete marks without changing anything in Photos.' },
      ],
    },
  ],
}

/** Product page sections beyond the catalog summary. */
export const details = {
  howDeletionWorks: [
    'Mark items while you review. They wait in the cleanup queue.',
    'Review the batch, then confirm in the Photos prompt.',
    'Photos moves them to Recently Deleted, where you can recover them or delete them permanently.',
  ],
  goodToKnow: [
    'Album filing needs Full Photos access. With Limited Access you can still review the items you shared.',
    'Media sizes are estimates. Photos may not free that much space.',
    'With iCloud Photos, deleting an item removes it from your other synced devices too.',
  ],
}
