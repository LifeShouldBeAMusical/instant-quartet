import { ContributionType, ContributorXrefFragment } from '@/graphql/types'
import setEquality from '@/util/set-equality'

export type ContributorGroup = {
	contributorName: string[]
	contributionType: ContributionType[]
}

const groupContributors = (
	contributors: ContributorXrefFragment[]
): ContributorGroup[] => {
	if (contributors.length == 0) {
		return []
	}

	if (contributors.length == 1) {
		return [
			{
				contributorName: [contributors[0].contributorName],
				contributionType: [contributors[0].contributionType]
			}
		]
	}

	const composers: string[] = []
	const lyricists: string[] = []
	const arrangers: string[] = []

	contributors.forEach((xref) => {
		switch (xref.contributionType) {
			case 'ARRANGER':
				arrangers.push(xref.contributorName)
				break
			case 'COMPOSER':
				composers.push(xref.contributorName)
				break
			case 'LYRICIST':
				lyricists.push(xref.contributorName)
		}
	})

	if (setEquality(composers, lyricists) && setEquality(composers, arrangers)) {
		return [
			{
				contributionType: [
					'COMPOSER',
					'LYRICIST',
					'ARRANGER'
				] as ContributionType[],
				contributorName: composers
			}
		].filter((group) => group.contributorName.length > 0)
	}

	if (setEquality(composers, lyricists)) {
		return [
			{
				contributionType: ['COMPOSER', 'LYRICIST'] as ContributionType[],
				contributorName: composers
			},
			{
				contributionType: ['ARRANGER' as ContributionType],
				contributorName: arrangers
			}
		].filter((group) => group.contributorName.length > 0)
	}

	return [
		{
			contributionType: ['COMPOSER' as ContributionType],
			contributorName: composers
		},
		{
			contributionType: ['LYRICIST' as ContributionType],
			contributorName: lyricists
		},
		{
			contributionType: ['ARRANGER' as ContributionType],
			contributorName: arrangers
		}
	].filter((group) => group.contributorName.length > 0)
}

export default groupContributors
