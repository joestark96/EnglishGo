import { Unit, LessonNode, Exercise } from '../types';

export interface JumpAheadLessonNode extends LessonNode {
  targetUnitId: number;
  targetNodeId?: string;
  skippedNodeIds: string[];
  skippedUnitsCount: number;
  isMultiUnit: boolean;
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function isLessonNodeCompleted(node: LessonNode): boolean {
  return node.stars > 0 || node.completedSteps >= node.totalSteps;
}

export interface MultiJumpOptions {
  units: Unit[];
  targetUnitId: number;
  targetNodeId?: string;
}

export function createMultiUnitJumpAheadLesson(
  options: MultiJumpOptions
): JumpAheadLessonNode | null {
  const { units, targetUnitId, targetNodeId } = options;
  const targetUnit = units.find((u) => u.id === targetUnitId);
  if (!targetUnit) return null;

  const targetNode = targetNodeId
    ? targetUnit.nodes.find((n) => n.id === targetNodeId)
    : undefined;

  const uncompletedNodes: LessonNode[] = [];
  const skippedNodeIds: string[] = [];
  const uncompletedUnitsSet = new Set<number>();

  for (const unit of units) {
    if (unit.id < targetUnitId) {
      for (const node of unit.nodes) {
        if (!isLessonNodeCompleted(node)) {
          uncompletedNodes.push(node);
          skippedNodeIds.push(node.id);
          uncompletedUnitsSet.add(unit.id);
        }
      }
    } else if (unit.id === targetUnitId) {
      if (targetNodeId) {
        for (const node of unit.nodes) {
          if (node.id === targetNodeId) {
            break;
          }
          if (!isLessonNodeCompleted(node)) {
            uncompletedNodes.push(node);
            skippedNodeIds.push(node.id);
            uncompletedUnitsSet.add(unit.id);
          }
        }
      } else {
        const isTargetUnitUnlocked = targetUnit.nodes.some((n) => n.unlocked);
        if (isTargetUnitUnlocked) {
          for (const node of targetUnit.nodes) {
            if (!isLessonNodeCompleted(node)) {
              uncompletedNodes.push(node);
              skippedNodeIds.push(node.id);
              uncompletedUnitsSet.add(unit.id);
            }
          }
        }
      }
      break;
    }
  }

  const sourceNodes = uncompletedNodes.length > 0 ? uncompletedNodes : targetUnit.nodes;

  const exercisesByUnit = new Map<number, Exercise[]>();
  sourceNodes.forEach((node) => {
    const list = exercisesByUnit.get(node.unitId) || [];
    list.push(...node.exercises.filter((e) => e.type !== 'dialogue-reading'));
    exercisesByUnit.set(node.unitId, list);
  });

  const unitIds = Array.from(exercisesByUnit.keys());
  const selectedExercises: Exercise[] = [];

  const targetExerciseCount = Math.min(18, Math.max(8, unitIds.length * 3 + 2));
  const perUnitQuota = Math.max(2, Math.floor(targetExerciseCount / (unitIds.length || 1)));

  unitIds.forEach((uId) => {
    const unitExercises = exercisesByUnit.get(uId) || [];
    if (unitExercises.length === 0) return;

    const shuffled = shuffle(unitExercises);
    const chosen: Exercise[] = shuffled.slice(0, perUnitQuota);
    selectedExercises.push(...chosen);
  });

  if (selectedExercises.length < targetExerciseCount) {
    const allRemaining = sourceNodes
      .flatMap((n) => n.exercises.filter((e) => e.type !== 'dialogue-reading'))
      .filter((e) => !selectedExercises.some((s) => s.id === e.id));
    selectedExercises.push(
      ...shuffle(allRemaining).slice(0, targetExerciseCount - selectedExercises.length)
    );
  }

  const finalExercises = shuffle(selectedExercises)
    .slice(0, targetExerciseCount)
    .map((ex) => {
      if (
        (ex.type === 'multiple-choice' || ex.type === 'listening') &&
        ex.options &&
        ex.options.length > 1
      ) {
        return { ...ex, options: shuffle(ex.options) };
      }
      return { ...ex };
    });

  const isMulti = uncompletedUnitsSet.size > 1 || skippedNodeIds.length > 3;
  const targetLabel = targetNode ? `Lección: ${targetNode.title}` : targetUnit.title;

  return {
    id: `jump-ahead-${targetUnitId}-${Date.now()}`,
    unitId: targetUnitId,
    lessonNumber: targetUnitId,
    title: isMulti ? `Examen de Salto: Hasta ${targetLabel}` : `Prueba de Salto: ${targetLabel}`,
    englishTitle: isMulti ? 'Multi-Unit Placement Challenge' : 'Unit Jump-Ahead Exam',
    description: `Demuestra tu dominio de los temas pendientes (${skippedNodeIds.length} lecciones). Máximo 3 errores permitidos.`,
    icon: 'FastForward',
    color: 'orange',
    totalSteps: finalExercises.length,
    unlocked: true,
    completedSteps: 0,
    stars: 0,
    exercises: finalExercises,
    targetUnitId,
    targetNodeId,
    skippedNodeIds,
    skippedUnitsCount: uncompletedUnitsSet.size,
    isMultiUnit: isMulti
  };
}
