"use client";

import {
	AspectRatio,
	Box,
	Button,
	Center,
	Divider,
	Heading,
	Icon,
	LinkBox,
	LinkOverlay,
	Spacer,
	Stack,
	Text,
} from "@chakra-ui/react";

import { Link as NextLink } from "next/link";
import Question from "@/components/Question";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

import { useParams } from "next/navigation";

export default async function Page() {
	const params = useParams();

	const data = await getData(params);
	const chapterInfo = data.units[params.unitId].chapters[params.chapterId];

	return (
		<Center w="100%" h="100%">
			<Stack w="100%" h="100%">
				<Stack direction="row" spacing={8}>
					<Stack w="100%">
						<Stack spacing={0}>
							<Box
								color="whiteAlpha.600"
								fontWeight="semibold"
								letterSpacing="wide"
								fontSize="xs"
								textTransform="uppercase"
							>
								Unit {params.unitId + 1} &bull; Chapter {params.chapterId + 1}
							</Box>
							<Heading> {chapterInfo.title}</Heading>
						</Stack>

						<AspectRatio
							overflow="clip"
							borderRadius="3xl"
							w="100%"
							maxH="sm"
							ratio={16 / 9}
						>
							<iframe
								title="chapter video"
								src={`https://www.youtube.com/embed/${chapterInfo.video_id}`}
								allowFullScreen
							/>
						</AspectRatio>

						<Heading size="lg">Video Summary</Heading>
						<Text>{chapterInfo.video_summary}</Text>
					</Stack>
					<Stack minW="xs">
						<Heading size="lg">Knowledge Check</Heading>
						{chapterInfo.quiz.map((question, index) => (
							<Question question={question} key={index} />
						))}
						<Button>Submit</Button>
					</Stack>
				</Stack>
				<Spacer />
				<Divider />
				<Stack direction="row">
					{data.units[params.unitId].chapters[+params.chapterId - 1] ? (
						<LinkBox>
							<Stack direction={"row"} align="center">
								<Icon as={FaChevronLeft} />
								<Stack justify="start" spacing={0}>
									<Text textAlign="left">Previous</Text>
									<Heading size="md" textAlign="left">
										<LinkOverlay
											as={NextLink}
											href={`/${params.courseId}/${params.unitId}/${
												+params.chapterId - 1
											}`}
										>
											{
												data.units[params.unitId].chapters[
													+params.chapterId - 1
												].title
											}
										</LinkOverlay>
									</Heading>
								</Stack>
							</Stack>
						</LinkBox>
					) : params.unitId > 0 ? (
						<LinkBox>
							<Stack direction={"row"} align="center">
								<Icon as={FaChevronLeft} />
								<Stack justify="start" spacing={0}>
									<Text textAlign="left">Previous</Text>
									<Heading size="md" textAlign="left">
										<LinkOverlay
											as={NextLink}
											href={`/${params.courseId}/${+params.unitId - 1}/${
												data.units[+params.unitId - 1].chapters.length - 1
											}`}
										>
											{
												data.units[+params.unitId - 1].chapters[
													data.units[+params.unitId - 1].chapters.length - 1
												].title
											}
										</LinkOverlay>
									</Heading>
								</Stack>
							</Stack>
						</LinkBox>
					) : (
						""
					)}
					<Spacer />
					{data.units[params.unitId].chapters.length ==
					+params.chapterId + 1 ? (
						data.units.length == +params.unitId + 1 ? (
							""
						) : (
							<LinkBox>
								<Stack direction={"row"} align="center">
									<Stack justify="end" spacing={0}>
										<Text textAlign="right">Next</Text>
										<Heading size="md" textAlign="right">
											<LinkOverlay
												as={NextLink}
												href={`/${params.courseId}/${+params.unitId + 1}/0`}
											>
												{data.units[+params.unitId + 1].chapters[0].title}
											</LinkOverlay>
										</Heading>
									</Stack>
									<Icon as={FaChevronRight} />
								</Stack>
							</LinkBox>
						)
					) : (
						<LinkBox>
							<Stack direction={"row"} align="center">
								<Stack justify="end" spacing={0}>
									<Text textAlign="right">Next</Text>
									<Heading size="md" textAlign="right">
										<LinkOverlay
											as={NextLink}
											href={`/${params.courseId}/${params.unitId}/${
												+params.chapterId + 1
											}`}
										>
											{
												data.units[params.unitId].chapters[
													+params.chapterId + 1
												].title
											}
										</LinkOverlay>
									</Heading>
								</Stack>
								<Icon as={FaChevronRight} />
							</Stack>
						</LinkBox>
					)}
				</Stack>
			</Stack>
		</Center>
	);
}

async function getData(params) {
	const response = await fetch("/api/course?id=" + params.courseId);
	const data = await response.json();
	return data;
}
